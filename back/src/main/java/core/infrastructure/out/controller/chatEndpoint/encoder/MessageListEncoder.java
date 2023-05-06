package core.infrastructure.out.controller.chatEndpoint.encoder;

import java.util.List;

import core.application.dto.Message;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;

public class MessageListEncoder implements Encoder.Text<List<Message>> {

    private Jsonb jsonb = JsonbBuilder.create();

    @Override
    public String encode(List<Message> messages) throws EncodeException {
        return jsonb.toJson(messages);
    }
    
}
