package core.application.out.interconnect;

public interface Interconnectorable {
    public String createToken(String userJson);
    public Boolean validateToken(String token);
}
