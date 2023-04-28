package infrastructure.timer;

import java.util.List;

import application.dto.Product;
import application.interfaces.in.IChatModelV2;
import application.interfaces.in.IProductsModel;
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
    IChatModelV2 modelChat;

    @Inject
    IProductsModel modelProducts;

    @PostConstruct
    public void init(){
        ScheduleExpression scheduleExpression = new ScheduleExpression();
        scheduleExpression.hour(2);
        scheduleExpression.minute(0);
        scheduleExpression.second(0);
        timerService.createCalendarTimer(scheduleExpression, new TimerConfig());
    }

    @Timeout
    public void checkChat(){
        List<String> rooms = modelChat.getRooms();
        for (String room : rooms) {
            Integer id = Integer.parseInt(room);
            Product product = modelProducts.getProductInfo(id);
            if (product == null){
                modelChat.cleanRoom(room);
            }
        }

    }
}
