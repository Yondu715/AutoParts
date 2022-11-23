package rest.controller.components;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import java.util.ArrayList;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import rest.builder.Built;
import rest.controller.interceptor.AuthRequired;
import rest.controller.token.Token;
import rest.model.dto.Product;
import rest.model.dto.User;
import rest.model.interfaces.in.IModelCart;
import rest.model.interfaces.in.IModelUser;

@Path("/users")
public class serverUser {

	@Inject @Built
	private IModelUser modelUser;

	@Inject@Built
	IModelCart modelCart;

	private Jsonb jsonb = JsonbBuilder.create();

	@POST
	@Path("/auth")
	public Response auth(@Context HttpHeaders httpHeaders, String userJson) {
		String token = httpHeaders.getHeaderString("Authorization");
		if (Token.checkToken(token)) {
			return Response.status(Response.Status.OK).build();
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
	@AuthRequired
	@Path("/cart")
	public Response getCart(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		ArrayList<Product> products = modelCart.getCart(login);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@POST
	@AuthRequired
	@Path("/cart")
	public Response addCart(@Context ContainerRequestContext requestContext, String productJson) {
		String login = requestContext.getProperty("login").toString();
		Product product = jsonb.fromJson(productJson, Product.class);
		if (modelCart.addToCart(login, product)) {
			return Response.status(Response.Status.OK).build();
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
}