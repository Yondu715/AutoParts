package core.infrastructure.in.rest.interconnector.api;

public interface Interconnectorable {
    public String createToken(String userJson);
    public Boolean validateToken(String token);
}
