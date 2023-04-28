package infrastructure.websocket.chatEndpoint;

import application.dto.Message;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;

public class MessageDecoder implements Decoder.Text<Message> {

    private Jsonb jsonb = JsonbBuilder.create();

    @Override
    public Message decode(String str) throws DecodeException {
        Message message;
        try {
            message = jsonb.fromJson(str, Message.class);
        } catch (Exception e) {
            message = new Message();
        }
        return message;
    }

    @Override
    public boolean willDecode(String str) {
        return (str != null);
    }

}
