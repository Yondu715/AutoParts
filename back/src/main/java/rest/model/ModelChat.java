package rest.model;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.ejb.Asynchronous;
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
    @Asynchronous
    public void addUser(String roomId, Session session) {
        ArrayList<Session> usersList = roomUsers.computeIfAbsent(roomId, k -> new ArrayList<>());
        synchronized (usersList) {
            roomMessages.putIfAbsent(roomId, new ArrayList<>());
            usersList.add(session);
        }
    }

    @Override
    @Asynchronous
    public void removeUser(String roomId, Session session) {
        ArrayList<Session> usersList = roomUsers.get(roomId);
        if (usersList == null){
            return;
        }
        synchronized (usersList) {
            usersList.remove(session);
        }
    }

    @Override
    @Asynchronous
    public void sendMessage(String roomId, Message message) {
        ArrayList<Session> usersList = roomUsers.get(roomId);
        ArrayList<Message> messages = roomMessages.computeIfAbsent(roomId, k -> new ArrayList<>());
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
        ArrayList<Message> messages = roomMessages.get(roomId);
        if (messages == null) {
            return;
        }
        synchronized (messages) {
            if (!messages.isEmpty()) {
                session.getAsyncRemote().sendText(jsonb.toJson(messages));
            }
        }
    }

}
