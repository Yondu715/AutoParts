package rest.controller.components.wsChat;

import jakarta.inject.Inject;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import rest.model.dto.Message;
import rest.model.interfaces.in.IChatModelV2;

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
