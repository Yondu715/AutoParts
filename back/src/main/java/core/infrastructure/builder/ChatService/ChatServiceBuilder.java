package core.infrastructure.builder.ChatService;

import core.application.in.service.chat.api.IChatService;
import core.application.out.execute.Executable;
import core.application.out.update.Updatable;
import core.infrastructure.builder.Build;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class ChatServiceBuilder {
    @Inject
    @Default
    private IChatService chatService;

    @Inject
    @Default
    private Executable executor;

    @Inject
    @Default
    private Updatable updater;

    @Produces
    @Build
    public IChatService buildChatService(){
        chatService.setExecutor(executor);
        chatService.setUpdater(updater);
        return chatService;
    }
}
