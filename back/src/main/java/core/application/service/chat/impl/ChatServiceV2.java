package core.application.service.chat.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import core.application.dto.Message;
import core.application.service.chat.api.Executable;
import core.application.service.chat.api.IChatServiceV2;
import core.application.service.chat.api.Updatable;

public class ChatServiceV2 implements IChatServiceV2 {

    public final static Map<String, List<String>> roomUsers = new ConcurrentHashMap<>();
    public final static Map<String, List<Message>> roomMessages = new ConcurrentHashMap<>();

    private Executable executor;
    private Updatable updater;

    @Override
    public void setExecutor(Executable executor) {
        this.executor = executor;
    }

    @Override
    public void setUpdater(Updatable updater) {
        this.updater = updater;
    }

    @Override
    public void addUser(String roomId, String userId) {
        executor.execute(() -> {
            List<String> usersList = roomUsers.computeIfAbsent(roomId, k -> new ArrayList<>());
            roomMessages.computeIfAbsent(roomId, k -> new ArrayList<>());
            synchronized (usersList) {
                usersList.add(userId);
                List<Message> messages = roomMessages.get(roomId);
                updater.updateUser(userId, messages);
            }
        });
    }

    @Override
    public void addMessage(String roomId, Message message) {
        List<Message> messages = roomMessages.get(roomId);
        List<String> users = roomUsers.get(roomId);
        messages.add(message);
        updater.updateMessage(users, message);
    }

    @Override
    public void removeUser(String roomId, String userId) {
        executor.execute(() -> {
            List<String> usersList = roomUsers.get(roomId);
            synchronized (usersList) {
                if (usersList != null) {
                    usersList.remove(userId);
                }
            }
        });
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
        executor.execute(() -> {
            roomUsers.remove(id);
            roomMessages.remove(id);
        });
    }

    @Override
    public List<Message> getMessages(String roomId) {
        return roomMessages.get(roomId);
    }


}
