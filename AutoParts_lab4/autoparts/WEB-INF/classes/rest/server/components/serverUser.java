package rest.server.components;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import java.util.ArrayList;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import rest.model.dto.Product;
import rest.model.dto.User;
import rest.model.interfaces.model.IModelCart;
import rest.model.interfaces.model.IModelUser;
import rest.server.token.Token;

@Path("/users")
public class serverUser {
	@Inject
	private IModelUser modelUser;
	@Inject
	IModelCart modelCart;
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
		if (!userJson.equals("null") && !userJson.equals("")) {
			User user = jsonb.fromJson(userJson, User.class);
			String login = user.getLogin();
			if (modelUser.authUser(user)) {
				String header = "{\"typ\": \"JWT\"}";
				String body = "{\"login\": \"" + login + "\"}";
				Token new_token = new Token(header, body);
				token = jsonb.toJson(new_token);
				return Response.ok(token).build();
			}
		}
		return Response.status(Response.Status.UNAUTHORIZED).build();
	}

	@POST
	@Path("/registration")
	public Response registration(String userJson) {
		User user = jsonb.fromJson(userJson, User.class);
		if (modelUser.addUser(user)) {
			return Response.status(Response.Status.OK).build();
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}

	@GET
	@Path("/cart")
	public Response getCart(@Context HttpHeaders httpHeaders) {
		String token = httpHeaders.getHeaderString("Authorization");
		String login = httpHeaders.getHeaderString("login");
		if (!Token.checkToken(token) || login.equals("null")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		ArrayList<Product> products = modelCart.getCart(login);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@POST
	@Path("/cart")
	public Response addCart(@Context HttpHeaders httpHeaders, String productJson) {
		String token = httpHeaders.getHeaderString("Authorization");
		String login = httpHeaders.getHeaderString("login");
		if (!Token.checkToken(token) || login.equals("null")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		Product product = jsonb.fromJson(productJson, Product.class);
		if (modelCart.addToCart(login, product)) {
			return Response.status(Response.Status.OK).build();
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
}