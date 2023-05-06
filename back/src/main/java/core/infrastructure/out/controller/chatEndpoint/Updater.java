package core.infrastructure.out.controller.chatEndpoint;

import java.util.List;

import core.application.dto.Message;
import core.application.service.chat.api.Updatable;

public class Updater implements Updatable {

    @Override
    public void updateUser(String userId, List<Message> messages) {
        ChatEndpoint.sendMessagesToUser(userId, messages);
    }

    @Override
    public void updateMessage(List<String> usersId, Message message) {
        ChatEndpoint.sendMessage(usersId, message);
    }
    
}
