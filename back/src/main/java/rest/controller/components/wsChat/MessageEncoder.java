package rest.controller.components.wsChat;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;
import rest.model.dto.Message;

public class MessageEncoder implements Encoder.Text<Message> {

    private Jsonb jsonb = JsonbBuilder.create();

    @Override
    public String encode(Message object) throws EncodeException {
        String json = jsonb.toJson(object);
        return json;
    }

}
