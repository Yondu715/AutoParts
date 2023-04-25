package rest.controller.components;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import rest.builder.Build;
import rest.controller.interceptor.AuthRequired;
import rest.controller.token.Token;
import rest.controller.token.TokenIssuer;
import rest.controller.token.TokenKey;
import rest.model.dto.Product;
import rest.model.dto.User;
import rest.model.interfaces.in.IApplicationModel;
import rest.model.interfaces.in.ICartModel;
import rest.model.interfaces.in.IUserModel;

@Path("/users")
public class serverUser {

	@Inject
	@Build
	private IUserModel userModel;

	@Inject
	@Build
	private ICartModel cartModel;

	@Inject
	@Build
	private IApplicationModel applicationModel;

	private Jsonb jsonb = JsonbBuilder.create();

	@POST
	@AuthRequired
	@Path("/auth")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authorization(@Context ContainerRequestContext requestContext, String userJson) {
		String login = requestContext.getProperty("login").toString();
		if (!login.equals("Not valid token")) {
			return Response.status(Response.Status.NO_CONTENT).build();
		}

		if (userJson.isEmpty()) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}

		try {
			User user = jsonb.fromJson(userJson, User.class);
			if (!userModel.authUser(user)) {
				return Response.status(Response.Status.UNAUTHORIZED).build();
			}
			User userFound = userModel.getUser(user);
			TokenKey tokenKey = TokenKey.getInstance();
			Key key = tokenKey.getKey();
			TokenIssuer ti = new TokenIssuer(key);
			String jwt = ti.issueToken(userFound.getLogin(), userFound.getRole());
			Token newToken = new Token(jwt);
			String token = jsonb.toJson(newToken);
			return Response.ok(token).build();
		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
	}

	@POST
	@Path("/registration")
	@Produces(MediaType.APPLICATION_JSON)
	public Response registration(String userJson) {
		try {
			User application = jsonb.fromJson(userJson, User.class);
			if (applicationModel.addAplication(application)) {
				return Response.status(Response.Status.OK).build();
			}
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.CONFLICT).build();
	}

	@GET
	@AuthRequired
	@Path("/cart")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCart(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		List<Product> products = cartModel.getCart(login);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@POST
	@AuthRequired
	@Path("/cart")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addCart(@Context ContainerRequestContext requestContext, String productJson) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		try {
			Product product = jsonb.fromJson(productJson, Product.class);
			if (cartModel.addToCart(login, product)) {
				return Response.status(Response.Status.OK).build();
			}
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.CONFLICT).build();
	}

	@DELETE
	@AuthRequired
	@Path("/cart")
	@Produces(MediaType.APPLICATION_JSON)
	public Response removal(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteId = requestContext.getProperty("data").toString();
		try {
			List<Product> productsId = jsonb.fromJson(jsonDeleteId, new ArrayList<Product>() {
			}.getClass().getGenericSuperclass());
			cartModel.deleteProduct(productsId);
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}