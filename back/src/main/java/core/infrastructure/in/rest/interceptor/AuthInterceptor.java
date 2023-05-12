package core.infrastructure.in.rest.interceptor;

import java.io.IOException;

import core.application.in.service.token.api.ITokenService;
import core.infrastructure.builder.Build;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;

@Provider
@AuthRequired
public class AuthInterceptor implements ContainerRequestFilter {

	@Inject @Build
	private ITokenService tokenService;
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		String data = requestContext.getHeaderString("Data");		
		Boolean valid = tokenService.validateToken(token);
		if (valid) {
			requestContext.setProperty("error", "No errors");
			requestContext.setProperty("data", data);
		} else {
			requestContext.setProperty("error", "Not valid token");
		}
	}
}
