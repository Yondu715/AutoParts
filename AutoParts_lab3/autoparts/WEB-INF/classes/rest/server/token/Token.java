package rest.server.token;

import java.util.Base64;

public class Token {
	public static String createToken(String header, String body) {
		String header64 = Base64.getEncoder().encodeToString(header.getBytes());
		String body64 = Base64.getEncoder().encodeToString(body.getBytes());
		String line = header64 + "." + body64;
		String token = line + "." + BCrypt.hashpw(line, BCrypt.gensalt(11));
		return token;
	}

	public static Boolean checkToken(String token) {
		String[] tokenParts = token.split("\\.", 3);
		String header = tokenParts[0];
		String body = tokenParts[1];
		String line = header + "." + body;
		String signatyre = tokenParts[2];
		return BCrypt.checkpw(line, signatyre);
	}
}
