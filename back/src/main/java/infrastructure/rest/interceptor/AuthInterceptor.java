package infrastructure.rest.interceptor;

import java.io.IOException;
import java.security.Key;

import infrastructure.rest.token.TokenKey;
import infrastructure.rest.token.TokenValidator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;

@Provider
@AuthRequired
public class AuthInterceptor implements ContainerRequestFilter {
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		String data = requestContext.getHeaderString("Data");
		Boolean valid = false;
		try {
			valid = TokenValidator.validate(token);
		} catch (Exception e) {
			requestContext.setProperty("login", "Not valid token");
		}
		if (valid) {
			TokenKey tokenKey = TokenKey.getInstance();
			Key key = tokenKey.getKey();
			Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
			String login = claims.get("login").toString();
			requestContext.setProperty("login", login);
			requestContext.setProperty("data", data);
		}
	}
}
