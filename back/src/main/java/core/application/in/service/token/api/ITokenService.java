package core.application.in.service.token.api;

import core.application.out.interconnect.Interconnectorable;

public interface ITokenService {
    public void setInterconnector(Interconnectorable interconnector);
    public String getToken(String json);
    public Boolean validateToken(String token);
}
