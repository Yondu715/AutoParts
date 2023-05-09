package core.infrastructure.in.rest.interconnector.impl;

import core.infrastructure.in.rest.interconnector.api.Interconnectorable;
import jakarta.annotation.Resource;
import jakarta.jms.ConnectionFactory;
import jakarta.jms.JMSContext;
import jakarta.jms.Queue;

public class Interconnector implements Interconnectorable {

    @Resource(mappedName = "jms/connectionFactory")
    private ConnectionFactory connectionFactory;

    @Resource(mappedName = "jms/authQueueToMS")
    private Queue authQueueToMS;

    @Resource(mappedName = "jms/authQueueToController")
    private Queue authQueueToController;

    @Override
    public String createToken(String userJson) {
        JMSContext jmsContext = connectionFactory.createContext();
        jmsContext.createProducer().send(authQueueToMS, "Create Token:" + userJson);
        String token = jmsContext.createConsumer(authQueueToController).receiveBody(String.class);
        jmsContext.close();
        return token;
    }

    @Override
    public Boolean validateToken(String token) {
        JMSContext jmsContext = connectionFactory.createContext();
        jmsContext.createProducer().send(authQueueToMS, "Validate Token:" + token);
        Boolean valid = jmsContext.createConsumer(authQueueToController).receiveBody(Boolean.class);
        jmsContext.close();
        return valid;
    }
    
}
