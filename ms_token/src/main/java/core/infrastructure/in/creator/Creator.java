package core.infrastructure.in.creator;

import java.security.Key;

import core.application.dto.User;
import core.application.out.create.Creatable;
import core.infrastructure.in.token.Token;
import core.infrastructure.in.token.TokenIssuer;
import core.infrastructure.in.token.TokenKey;
import core.infrastructure.in.token.TokenValidator;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

public class Creator implements Creatable {

    private Jsonb jsonb = JsonbBuilder.create();

    @Override
    public String createToken(User user) {
        TokenKey tokenKey = TokenKey.getInstance();
        Key key = tokenKey.getKey();
        TokenIssuer ti = new TokenIssuer(key);
        String jwt = ti.issueToken(user.getId(), user.getLogin(), user.getRole());
        Token token = new Token(jwt);
        return jsonb.toJson(token);
    }

    @Override
    public Boolean validateToken(String token) {
        Boolean valid;
        try {
            valid = TokenValidator.validate(token);
        } catch (Exception e) {
            valid = false;
        }
        return valid;
    }
    
}
