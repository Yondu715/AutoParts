package rest.model.interfaces.in;

import java.util.List;

import jakarta.websocket.Session;
import rest.model.dto.Message;

public interface IModelChatV2 {
    public void addUser(String roomId, Session session);

    public void removeUser(String roomId, Session session);

    public void sendMessage(String roomId, Message message);

    public void sendPrevMessages(String roomId, Session session);

    public List<String> getRooms();

    public void cleanRoom(String id);
}
