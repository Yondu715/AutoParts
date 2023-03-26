package rest.controller.components.wsChat;

import jakarta.inject.Inject;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import rest.model.dto.Message;
import rest.model.interfaces.in.IModelChat;

@ServerEndpoint(value = "/chat/{roomId}", encoders = MessageEncoder.class, decoders = MessageDecoder.class)
public class ChatEndpoint {

    @Inject
    IModelChat modelChat;

    @OnOpen
    public void connectionOpen(@PathParam("roomId") String roomId, Session session) {
        modelChat.addUser(roomId, session);
        modelChat.sendPrevMessages(roomId, session);
    }

    @OnClose
    public void connectionClose(@PathParam("roomId") String roomId, Session session) {
        modelChat.removeUser(roomId, session);
    }

    @OnMessage
    public void processMessage(@PathParam("roomId") String roomId, Session session, Message message) {
        modelChat.sendMessage(roomId, message);
    }
}
