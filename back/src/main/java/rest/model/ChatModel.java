package rest.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.ejb.Asynchronous;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.Session;
import rest.model.dto.Message;
import rest.model.interfaces.in.IChatModel;

public class ChatModel implements IChatModel {

    private Jsonb jsonb = JsonbBuilder.create();
    private final static Map<String, List<Session>> roomUsers = new ConcurrentHashMap<>();
    private final static Map<String, List<Message>> roomMessages = new ConcurrentHashMap<>();

    @Override
    @Asynchronous
    public void addUser(String roomId, Session session) {
        List<Session> usersList = roomUsers.computeIfAbsent(roomId, k -> new ArrayList<>());
        roomMessages.computeIfAbsent(roomId, k -> new ArrayList<>());
        synchronized (usersList) {
            usersList.add(session);
        }
    }

    @Override
    @Asynchronous
    public void removeUser(String roomId, Session session) {
        List<Session> usersList = roomUsers.get(roomId);
        synchronized (usersList) {
            if (usersList != null) {
                usersList.remove(session);
            }
        }
    }

    @Override
    @Asynchronous
    public void sendMessage(String roomId, Message message) {
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
    }

    @Override
    @Asynchronous
    public void sendPrevMessages(String roomId, Session session) {
        List<Message> messages = roomMessages.get(roomId);
        synchronized (messages) {
            if (messages != null && !messages.isEmpty()) {
                session.getAsyncRemote().sendText(jsonb.toJson(messages));
            }
        }
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
