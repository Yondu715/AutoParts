package rest.Server;

public class TokenBuilder {
	public static Token createToken(String login, String password){
		Token token = new Token();
		String line = login + "." + password;
		String hash = String.valueOf(line.hashCode());
		token.setValue(hash);
		return token;
	}
}
