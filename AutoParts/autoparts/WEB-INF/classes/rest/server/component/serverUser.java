package rest.server.component;

import jakarta.ws.rs.Path;
import jakarta.inject.Inject;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import rest.model.dataObject.User;
import rest.model.interfaces.IModelUser;
import rest.server.token.Token;

@Path("/users")
public class serverUser {
	@Inject
	private IModelUser model;
	private Jsonb jsonb = JsonbBuilder.create();

	@POST
	@Path("/auth")
	public Response auth(@Context HttpHeaders httpHeaders, String userJson) {
		String token = httpHeaders.getHeaderString("Authorization");
		if (!token.equals("null")) {
			if (Token.checkToken(token)) {
				return Response.status(Response.Status.OK).build();
			}
		}
		if (!userJson.equals("null")) {
			User user = jsonb.fromJson(userJson, User.class);
			String login = user.getLogin();
			if (model.authUser(user)) {
				String header = "{\"typ\": \"JWT\"}";
				String body = "{\"login\": \"" + login + "\"}";
				token = Token.createToken(header, body);
				return Response.ok(token).build();
			}
		}
		return Response.status(Response.Status.UNAUTHORIZED).build();
	}

	@POST
	@Path("/registration")
	public Response registration(String userJson) {
		User user = jsonb.fromJson(userJson, User.class);
		if (model.addUser(user)) {
			return Response.status(Response.Status.OK).build();
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
}