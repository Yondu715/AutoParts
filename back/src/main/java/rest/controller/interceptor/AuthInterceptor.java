package rest.controller.interceptor;

import java.io.IOException;
import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;
import rest.controller.token.TokenKey;
import rest.controller.token.TokenValidator;

@Provider
@AuthRequired
public class AuthInterceptor implements ContainerRequestFilter {
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		Boolean valid;
		try {
			valid = TokenValidator.validate(token);
		} catch (Exception e) {
			valid = false;
		}
		if (valid) {
			TokenKey tokenKey = TokenKey.getInstance();
			Key key = tokenKey.getKey();
			Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
			String login = claims.get("login").toString();
			requestContext.setProperty("login", login);
		} else {
			throw new NotAuthorizedException("Not valid token");
		}
	}
}
