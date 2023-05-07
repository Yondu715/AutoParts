package core.infrastructure.out.controller.chatEndpoint;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import core.application.dto.Message;
import core.application.service.chat.api.IChatServiceV2;
import core.infrastructure.builder.Build;
import core.infrastructure.out.controller.chatEndpoint.decoder.MessageDecoder;
import core.infrastructure.out.controller.chatEndpoint.encoder.MessageEncoder;
import core.infrastructure.out.controller.chatEndpoint.encoder.MessageListEncoder;
import jakarta.inject.Inject;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat/{roomId}", decoders = MessageDecoder.class, encoders = { MessageEncoder.class,
        MessageListEncoder.class })
public class ChatEndpoint {

    @Inject
    @Build
    private IChatServiceV2 chatService;

    private final static Map<String, Session> mapIdSs = new ConcurrentHashMap<>();
    private final static Map<Session, String> mapSsId = new ConcurrentHashMap<>();

    @OnClose
    public void onClose(@PathParam("roomId") String roomId, Session session) {
        String id = mapSsId.remove(session);
        mapIdSs.remove(id);
        chatService.removeUser(roomId, id);
    }

    @OnMessage
    public void onMessage(@PathParam("roomId") String roomId, Session session, Message message) {
        if (message.getType().equals("connection")) {
            String id = message.getContent();
            mapIdSs.put(id, session);
            mapSsId.put(session, id);
            chatService.addUser(roomId, id);
        } else if (message.getType().equals("message")) {
            chatService.addMessage(roomId, message);
        }
    }

    public static void sendMessage(List<String> usersId, Message message) {
        for (String userId : usersId) {
            Session userSession = mapIdSs.get(userId);
            if (userSession == null || !userSession.isOpen()) {
                continue;
            }
            try {
                userSession.getBasicRemote().sendObject(message);
            } catch (Exception e) {
            }

        }
    }

    public static void sendMessagesToUser(String userId, List<Message> messages) {
        Session userSession = mapIdSs.get(userId);
        if (userSession == null || !userSession.isOpen()) {
            return;
        }
        try {
            userSession.getBasicRemote().sendObject(messages);
        } catch (Exception e) {
        }
    }
}
