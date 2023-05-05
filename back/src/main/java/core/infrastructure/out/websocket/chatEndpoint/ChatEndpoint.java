package core.infrastructure.out.websocket.chatEndpoint;

import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import core.application.dto.Message;
import core.application.services.chat.api.IChatService;
import jakarta.inject.Inject;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat/{roomId}", decoders = MessageDecoder.class)
public class ChatEndpoint {

    @Inject
    IChatService chatService;

    private Jsonb jsonb = JsonbBuilder.create();

    private final static Queue<Session> sessions = new ConcurrentLinkedQueue<>();
    private final static Map<String, Session> mapIdSs = new ConcurrentHashMap<>();
    private final static Map<Session, String> mapSsId = new ConcurrentHashMap<>();

    @OnOpen
    public void connectionOpen(@PathParam("roomId") String roomId, Session session) {
        sessions.add(session);
    }

    @OnClose
    public void connectionClose(@PathParam("roomId") String roomId, Session session) {
        sessions.remove(session);
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
            List<Message> messages = chatService.getMessages(roomId);
            if (messages != null && !messages.isEmpty()) {
                session.getAsyncRemote().sendText(jsonb.toJson(messages));
            }
        } else {
            List<String> usersList = chatService.getUsers(roomId);
            chatService.addMessage(roomId, message);
            for (String userId : usersList) {
                Session userSession = mapIdSs.get(userId);
                userSession.getAsyncRemote().sendText(jsonb.toJson(message));
            }
        }
    }
}
