package application.interfaces.in;

import java.util.List;

import application.dto.Message;
import jakarta.websocket.Session;

public interface IChatModel {
    public void addUser(String roomId, Session session);

    public void removeUser(String roomId, Session session);

    public void sendMessage(String roomId, Message message);

    public void sendPrevMessages(String roomId, Session session);

    public List<String> getRooms();

    public void cleanRoom(String id);
}
