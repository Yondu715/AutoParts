package core.application.service.chat.api;

import java.util.List;

import core.application.dto.Message;

public interface IChatService {
    public void addUser(String roomId, String userId);

    public void addMessage(String roomId, Message message);

    public void removeUser(String roomId, String userId);

    public List<String> getUsers(String roomId);

    public List<Message> getMessages(String roomId);

    public List<String> getRooms();

    public void cleanRoom(String id);
}
