package infrastructure.websocket.chatEndpoint;

import application.dto.Message;
import application.interfaces.in.IChatServiceV2;
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
    IChatServiceV2 chatService;

    @OnOpen
    public void connectionOpen(@PathParam("roomId") String roomId, Session session) {
        chatService.addUser(roomId, session);
        chatService.sendPrevMessages(roomId, session);
    }

    @OnClose
    public void connectionClose(@PathParam("roomId") String roomId, Session session) {
        chatService.removeUser(roomId, session);
    }

    @OnMessage
    public void processMessage(@PathParam("roomId") String roomId, Session session, Message message) {
        chatService.sendMessage(roomId, message);
    }
}
