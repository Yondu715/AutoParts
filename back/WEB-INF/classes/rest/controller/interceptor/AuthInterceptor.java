package rest.controller.interceptor;

import java.io.IOException;
import java.util.Base64;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;
import rest.controller.token.Token;
import rest.model.dto.User;

@Provider
@AuthRequired
public class AuthInterceptor implements ContainerRequestFilter {
	
	private Jsonb jsonb = JsonbBuilder.create();

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		if (Token.checkToken(token)) {
			String[] tokenParts = token.split("\\.", 3);
			String body = new String(Base64.getDecoder().decode(tokenParts[1]));
			User user = jsonb.fromJson(body, User.class);
			requestContext.setProperty("login", user.getLogin());
		} else {
			throw new NotAuthorizedException("Not valid token");
		}
	}
}
