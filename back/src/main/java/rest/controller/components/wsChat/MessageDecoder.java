package rest.controller.components.wsChat;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;
import rest.model.dto.Message;

public class MessageDecoder implements Decoder.Text<Message> {

    private Jsonb jsonb = JsonbBuilder.create();

    @Override
    public Message decode(String s) throws DecodeException {
        Message message;
        try {
            message = jsonb.fromJson(s, Message.class);
        } catch (Exception e) {
            message = new Message();
        }
        return message;
    }

    @Override
    public boolean willDecode(String s) {
        return (s != null);
    }

}
