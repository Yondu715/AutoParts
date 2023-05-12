package core.application.out.update;

import java.util.List;

import core.application.dto.Message;

public interface Updatable {
    public void updateUser(String userId, List<Message> messages);
    public void updateMessage(List<String> usersId, Message message);
}
