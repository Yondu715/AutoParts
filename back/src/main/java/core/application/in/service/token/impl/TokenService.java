package core.application.in.service.token.impl;

import core.application.in.service.token.api.ITokenService;
import core.application.out.interconnect.Interconnectorable;

public class TokenService implements ITokenService {

    private Interconnectorable interconnector;

    @Override
    public void setInterconnector(Interconnectorable interconnector) {
        this.interconnector = interconnector;
    }

    @Override
    public String getToken(String json) {
        return interconnector.createToken(json);
    }

    @Override
    public Boolean validateToken(String token) {
        return interconnector.validateToken(token);
    }
    
}
