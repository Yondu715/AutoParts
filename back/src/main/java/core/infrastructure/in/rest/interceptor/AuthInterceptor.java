package core.infrastructure.in.rest.interceptor;

import java.io.IOException;

import core.infrastructure.in.rest.interconnector.api.Interconnectorable;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;

@Provider
@AuthRequired
public class AuthInterceptor implements ContainerRequestFilter {

	@Inject
	private Interconnectorable interconnector;
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		String data = requestContext.getHeaderString("Data");		
		Boolean valid = interconnector.validateToken(token);
		if (valid) {
			requestContext.setProperty("error", "No errors");
			requestContext.setProperty("data", data);
		} else {
			requestContext.setProperty("error", "Not valid token");
		}
	}
}
