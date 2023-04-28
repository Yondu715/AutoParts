package infrastructure.websocket.chatEndpoint;

import application.dto.Message;
import application.interfaces.in.IChatModelV2;
import jakarta.inject.Inject;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat/{roomId}", decoders = MessageDecoder.class)
public class ChatEndpoint {

    @Inject
    IChatModelV2 chatModel;

    @OnOpen
    public void connectionOpen(@PathParam("roomId") String roomId, Session session) {
        chatModel.addUser(roomId, session);
        chatModel.sendPrevMessages(roomId, session);
    }

    @OnClose
    public void connectionClose(@PathParam("roomId") String roomId, Session session) {
        chatModel.removeUser(roomId, session);
    }

    @OnMessage
    public void processMessage(@PathParam("roomId") String roomId, Session session, Message message) {
        chatModel.sendMessage(roomId, message);
    }
}
