package rest.model;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.Session;
import rest.model.dto.Message;
import rest.model.interfaces.in.IModelChat;

public class ModelChat implements IModelChat {

    private Jsonb jsonb = JsonbBuilder.create();
    private final static ConcurrentHashMap<String, ArrayList<Session>> roomUsers = new ConcurrentHashMap<>();
    private final static ConcurrentHashMap<String, ArrayList<Message>> roomMessages = new ConcurrentHashMap<>();

    @Override
    public void addUser(String roomId, Session session) {
        ArrayList<Session> usersList = roomUsers.getOrDefault(roomId, new ArrayList<>());
        synchronized (usersList) {
            roomMessages.putIfAbsent(roomId, new ArrayList<>());
            usersList.add(session);
            roomUsers.put(roomId, usersList);
        }
    }

    @Override
    public void removeUser(String roomId, Session session) {
        ArrayList<Session> usersList = roomUsers.get(roomId);
        synchronized (usersList) {
            usersList.remove(session);
        }
    }

    @Override
    public void sendMessage(String roomId, Message message) {
        ArrayList<Session> usersList = roomUsers.get(roomId);
        ArrayList<Message> messages = roomMessages.get(roomId);
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
    public void sendPrevMessages(String roomId, Session session) {
        ArrayList<Message> messages = roomMessages.get(roomId);
        synchronized (messages) {
            if (messages.size() > 0) {
                session.getAsyncRemote().sendText(jsonb.toJson(messages));
            }
        }
    }

}
