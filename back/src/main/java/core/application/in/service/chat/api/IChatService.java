package core.application.in.service.chat.api;

import java.util.List;

import core.application.dto.Message;
import core.application.out.execute.Executable;
import core.application.out.update.Updatable;

public interface IChatService {

    public void setExecutor(Executable executor);

    public void setUpdater(Updatable updater);

    public void addUser(String roomId, String userId);

    public void addMessage(String roomId, Message message);

    public void removeUser(String roomId, String userId);

    public List<String> getUsers(String roomId);

    public List<Message> getMessages(String roomId);

    public List<String> getRooms();

    public void cleanRoom(String id);
}
