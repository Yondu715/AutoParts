package core.application.services.chat.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import core.application.dto.Message;
import core.application.services.chat.api.IChatService;

public class ChatService implements IChatService {

    public final static Map<String, List<String>> roomUsers = new ConcurrentHashMap<>();
    public final static Map<String, List<Message>> roomMessages = new ConcurrentHashMap<>();

    @Override
    public void addUser(String roomId, String userId) {
        List<String> usersList = roomUsers.computeIfAbsent(roomId, k -> new ArrayList<>());
        roomMessages.computeIfAbsent(roomId, k -> new ArrayList<>());
        synchronized (usersList) {
            usersList.add(userId);
        }
    }

    @Override
    public void removeUser(String roomId, String userId) {
        List<String> usersList = roomUsers.get(roomId);
        synchronized (usersList) {
            if (usersList != null) {
                usersList.remove(userId);
            }
        }
    }

    @Override
    public List<String> getUsers(String roomId) {
        return roomUsers.get(roomId);
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

    @Override
    public List<Message> getMessages(String roomId) {
        return roomMessages.get(roomId);
    }

    @Override
    public void addMessage(String roomId, Message message) {
        List<Message> messages = roomMessages.get(roomId);
        messages.add(message);
    }

}
