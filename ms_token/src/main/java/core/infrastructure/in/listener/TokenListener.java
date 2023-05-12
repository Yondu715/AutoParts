package core.infrastructure.in.listener;

import core.application.dto.User;
import core.application.out.create.Creatable;
import jakarta.annotation.Resource;
import jakarta.ejb.MessageDriven;
import jakarta.inject.Inject;
import jakarta.jms.ConnectionFactory;
import jakarta.jms.JMSContext;
import jakarta.jms.Message;
import jakarta.jms.MessageListener;
import jakarta.jms.Queue;
import jakarta.jms.TextMessage;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

@MessageDriven(mappedName = "jms/authQueueToMS")
public class TokenListener implements MessageListener {

	@Resource(mappedName = "jms/connectionFactory")
	private ConnectionFactory connectionFactory;

	@Resource(mappedName = "jms/authQueueToController")
	private Queue authQueueToController;

	@Inject
	private Creatable creator;

	private Jsonb jsonb = JsonbBuilder.create();

	@Override
	public void onMessage(Message message) {
		TextMessage textMessage = (TextMessage) message;
		try {
			String[] str = textMessage.getText().split(":", 2);
			String command = str[0];
			String data = str[1];
			JMSContext jmsContext = connectionFactory.createContext();
			switch (command) {
				case "Create Token":
					User user = jsonb.fromJson(data, User.class);
					String tokenJson = creator.createToken(user);
					jmsContext.createProducer().send(authQueueToController, tokenJson);
					break;
				case "Validate Token":
					Boolean status = creator.validateToken(data);
					jmsContext.createProducer().send(authQueueToController, status);
					break;
				default:
					break;
			}
			jmsContext.close();
		} catch (Exception e) {
			System.out.println(e);
		}
	}

}