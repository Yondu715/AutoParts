package core.listener;

import java.security.Key;

import core.token.Token;
import core.token.TokenIssuer;
import core.token.TokenKey;
import core.token.TokenValidator;
import jakarta.annotation.Resource;
import jakarta.ejb.MessageDriven;
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

	private Jsonb jsonb = JsonbBuilder.create();

	@Override
	public void onMessage(Message message) {
	TextMessage textMessage = (TextMessage) message;
		try {
			String[] str = textMessage.getText().split(":", 2);
			String command = str[0];
			String data = str[1];
			if (command.equals("Create Token")){
				User user = jsonb.fromJson(data, User.class);
				Token token = generateToken(user);
				String tokenJson = jsonb.toJson(token);
				JMSContext jmsContext = connectionFactory.createContext();
				jmsContext.createProducer().send(authQueueToController, tokenJson);
				jmsContext.close();
			} else if (command.equals("Validate Token")){
				Boolean status = validateToken(data);
				JMSContext jmsContext = connectionFactory.createContext();
				jmsContext.createProducer().send(authQueueToController, status);
				jmsContext.close();
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	private Token generateToken(User user){
		TokenKey tokenKey = TokenKey.getInstance();
		Key key = tokenKey.getKey();
		TokenIssuer ti = new TokenIssuer(key);
		String jwt = ti.issueToken(user.getId(), user.getLogin(), user.getRole());
		Token token = new Token(jwt);
		return token;
	}

	private Boolean validateToken(String token){
		Boolean valid;
		try {
			valid = TokenValidator.validate(token);
		} catch (Exception e) {
			valid = false;
		}
		return valid;
	}

}