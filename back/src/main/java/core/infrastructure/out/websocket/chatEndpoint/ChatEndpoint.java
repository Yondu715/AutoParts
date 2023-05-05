package core.infrastructure.out.websocket.chatEndpoint;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import core.application.dto.Message;
import core.application.service.chat.api.IChatServiceV2;
import core.infrastructure.builder.Build;
import jakarta.inject.Inject;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat/{roomId}", decoders = MessageDecoder.class)
public class ChatEndpoint {

    @Inject @Build
    IChatServiceV2 chatService;

    private Jsonb jsonb = JsonbBuilder.create();

    private final static Map<String, Session> mapIdSs = new ConcurrentHashMap<>();
    private final static Map<Session, String> mapSsId = new ConcurrentHashMap<>();

    @OnClose
    public void connectionClose(@PathParam("roomId") String roomId, Session session) {
        String id = mapSsId.remove(session);
        mapIdSs.remove(id);
        chatService.removeUser(roomId, id);
    }

    @OnMessage
    public void processMessage(@PathParam("roomId") String roomId, Session session, Message message) {
        if (message.getType().equals("connection")) {
            String id = message.getContent();
            mapIdSs.put(id, session);
            mapSsId.put(session, id);
            chatService.addUser(roomId, id);
            sendPrevMessages(roomId, session);
        } else {
            sendMessage(roomId, message);
        }
    }

    private void sendPrevMessages(String roomId, Session session) {
        List<Message> messages = chatService.getMessages(roomId);
        if (messages != null && !messages.isEmpty()) {
            session.getAsyncRemote().sendText(jsonb.toJson(messages));
        }
    }

    private void sendMessage(String roomId, Message message){
        List<String> usersList = chatService.getUsers(roomId);
        chatService.addMessage(roomId, message);
        for (String userId : usersList) {
            Session userSession = mapIdSs.get(userId);
            userSession.getAsyncRemote().sendText(jsonb.toJson(message));
        }
    }
}
