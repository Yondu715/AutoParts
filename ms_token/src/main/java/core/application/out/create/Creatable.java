package core.application.out.create;

import core.application.dto.User;

public interface Creatable {
    public String createToken(User user);
    public Boolean validateToken(String token);
}
