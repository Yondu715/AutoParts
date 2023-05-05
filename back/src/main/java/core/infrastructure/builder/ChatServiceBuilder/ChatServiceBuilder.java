package core.infrastructure.builder.ChatServiceBuilder;

import core.application.executor.api.Executable;
import core.application.service.chat.api.IChatServiceV2;
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

    @Produces
    @Build
    public IChatServiceV2 buildChatServiceV2(){
        chatService.setExecutor(executor);
        return chatService;
    }
}
