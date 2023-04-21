package rest.model;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.annotation.Resource;
import jakarta.enterprise.concurrent.ManagedExecutorService;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.Session;
import rest.model.dto.Message;
import rest.model.interfaces.in.IModelChatV2;

public class ModelChatV2 implements IModelChatV2 {

    @Resource
    ManagedExecutorService mes;
    
    private Jsonb jsonb = JsonbBuilder.create();
    private final static ConcurrentHashMap<String, ArrayList<Session>> roomUsers = new ConcurrentHashMap<>();
    private final static ConcurrentHashMap<String, ArrayList<Message>> roomMessages = new ConcurrentHashMap<>();

    @Override
    public void addUser(String roomId, Session session) {
        mes.execute(() -> {
            ArrayList<Session> usersList = roomUsers.computeIfAbsent(roomId, k -> new ArrayList<>());
            synchronized (usersList) {
                usersList.add(session);
                roomMessages.computeIfAbsent(roomId, k -> new ArrayList<>());
            }
        });
    }

    @Override
    public void removeUser(String roomId, Session session) {
        mes.execute(() -> {
            ArrayList<Session> usersList = roomUsers.get(roomId);
            if (usersList == null) {
                return;
            }
            synchronized (usersList) {
                usersList.remove(session);
            }
        });
    }

    @Override
    public void sendMessage(String roomId, Message message) {
        mes.execute(() -> {
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
        });
    }

    @Override
    public void sendPrevMessages(String roomId, Session session) {
        mes.execute(() -> {
            ArrayList<Message> messages = roomMessages.get(roomId);
            if (messages == null) {
                return;
            }
            synchronized (messages) {
                if (!messages.isEmpty()) {
                    session.getAsyncRemote().sendText(jsonb.toJson(messages));
                }
            }
        });
    }

    @Override
    public List<String> getRooms() {
        Enumeration<String> rooms = roomUsers.keys();
        List<String> roomList = new ArrayList<>();
        while (rooms.hasMoreElements()) {
            roomList.add(rooms.nextElement());
            ;
        }
        return roomList;
    }

    @Override
    public void cleanRoom(String id) {
        roomUsers.remove(id);
        roomMessages.remove(id);
    }
    
}
