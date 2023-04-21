package rest.controller.timer;

import java.util.Date;
import java.util.List;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.ejb.Timeout;
import jakarta.ejb.TimerConfig;
import jakarta.ejb.TimerService;
import jakarta.inject.Inject;
import rest.model.dto.Product;
import rest.model.interfaces.in.IModelChatV2;
import rest.model.interfaces.in.IModelProducts;


@Singleton
@Startup
public class CleanUpChatTimer {
    
    @Resource
    TimerService timerService;

    @Inject
    IModelChatV2 modelChat;

    @Inject
    IModelProducts modelProducts;

    @PostConstruct
    public void init(){
        timerService.createIntervalTimer(new Date(), 24 * 60 * 60 * 1000, new TimerConfig());
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
