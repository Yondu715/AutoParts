package rest.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.annotation.Resource;
import jakarta.enterprise.concurrent.ManagedExecutorService;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.Session;
import rest.model.dto.Message;
import rest.model.interfaces.in.IChatModelV2;

public class ChatModelV2 implements IChatModelV2 {

    @Resource
    ManagedExecutorService mes;

    private Jsonb jsonb = JsonbBuilder.create();
    private final static Map<String, List<Session>> roomUsers = new ConcurrentHashMap<>();
    private final static Map<String, List<Message>> roomMessages = new ConcurrentHashMap<>();

    @Override
    public void addUser(String roomId, Session session) {
        mes.execute(() -> {
            List<Session> usersList = roomUsers.computeIfAbsent(roomId, k -> new ArrayList<>());
            roomMessages.computeIfAbsent(roomId, k -> new ArrayList<>());
            synchronized (usersList) {
                usersList.add(session);
            }
        });
    }

    @Override
    public void removeUser(String roomId, Session session) {
        mes.execute(() -> {
            List<Session> usersList = roomUsers.get(roomId);
            synchronized (usersList) {
                if (usersList != null) {
                    usersList.remove(session);
                }
            }
        });
    }

    @Override
    public void sendMessage(String roomId, Message message) {
        mes.execute(() -> {
            List<Session> usersList = roomUsers.get(roomId);
            List<Message> messages = roomMessages.get(roomId);
            synchronized (usersList) {
                messages.add(message);
                for (Session session : usersList) {
                    if (session.isOpen()) {
                        session.getAsyncRemote().sendText(jsonb.toJson(message));
                    }
                }
            }
        });
    }

    @Override
    public void sendPrevMessages(String roomId, Session session) {
        mes.execute(() -> {
            List<Message> messages = roomMessages.get(roomId);
            synchronized (messages) {
                if (messages != null && !messages.isEmpty()) {
                    session.getAsyncRemote().sendText(jsonb.toJson(messages));
                }
            }
        });
    }

    @Override
    public List<String> getRooms() {
        return new ArrayList<>(roomUsers.keySet());
    }

    @Override
    public void cleanRoom(String id) {
        roomUsers.remove(id);
        roomMessages.remove(id);
    }

}
