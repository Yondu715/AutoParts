package core.infrastructure.in.timer;

import java.util.List;

import core.application.dto.Product;
import core.application.service.chat.api.IChatServiceV2;
import core.application.service.products.api.IProductsService;
import core.infrastructure.builder.Build;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.ejb.ScheduleExpression;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.ejb.Timeout;
import jakarta.ejb.TimerConfig;
import jakarta.ejb.TimerService;
import jakarta.inject.Inject;

@Singleton
@Startup
public class CleanUpChatTimer {

    @Resource
    TimerService timerService;

    @Inject
    @Build
    IChatServiceV2 chatService;

    @Inject
    @Build
    IProductsService productsService;

    @PostConstruct
    public void init() {
        timerService.createCalendarTimer(
                new ScheduleExpression()
                        .hour(2)
                        .minute(0)
                        .second(0),
                new TimerConfig());
    }

    @Timeout
    public void checkChat() {
        List<String> rooms = chatService.getRooms();
        for (String room : rooms) {
            Integer id = Integer.parseInt(room);
            Product product = productsService.getProductById(id);
            if (product == null) {
                chatService.cleanRoom(room);
            }
        }

    }
}
