package rest.model.interfaces.in;

import jakarta.websocket.Session;
import rest.model.dto.Message;

public interface IModelChat {
    public void addUser(String roomId, Session session);

    public void removeUser(String roomId, Session session);

    public void sendMessage(String roomId, Message message);

    public void sendPrevMessages(String roomId, Session session);
}
