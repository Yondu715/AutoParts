package core.infrastructure.builder.ChatService;

import core.application.service.chat.api.Executable;
import core.application.service.chat.api.IChatServiceV2;
import core.application.service.chat.api.Updatable;
import core.infrastructure.builder.Build;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class ChatServiceBuilder {
    @Inject
    @Default
    private IChatServiceV2 chatService;

    @Inject
    @Default
    private Executable executor;

    @Inject
    @Default
    private Updatable updater;

    @Produces
    @Build
    public IChatServiceV2 buildChatService(){
        chatService.setExecutor(executor);
        chatService.setUpdater(updater);
        return chatService;
    }
}
