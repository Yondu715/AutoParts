package rest.controller.components;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import rest.builder.Build;
import rest.controller.interceptor.AuthRequired;
import rest.controller.token.Token;
import rest.controller.token.TokenIssuer;
import rest.controller.token.TokenKey;
import rest.controller.token.TokenValidator;
import rest.model.dto.Product;
import rest.model.dto.User;
import rest.model.interfaces.in.IModelApplications;
import rest.model.interfaces.in.IModelCart;
import rest.model.interfaces.in.IModelUser;

@Path("/users")
public class serverUser {

	@Inject
	@Build
	private IModelUser modelUser;

	@Inject
	@Build
	private IModelCart modelCart;

	@Inject
	@Build
	private IModelApplications modelApplications;

	private Jsonb jsonb = JsonbBuilder.create();

	@POST
	@Path("/auth")
	public Response auth(@Context HttpHeaders httpHeaders, String userJson) {
		String token = httpHeaders.getHeaderString("Authorization");
		try {
			if (TokenValidator.validate(token)) {
				return Response.status(Response.Status.OK).build();
			}
		} catch (Exception e) {
			Logger.getLogger(serverUser.class.getName()).log(Level.INFO, null, e);
		}
		
		if (!userJson.equals("")) {
			User user;								
			try {
				user = jsonb.fromJson(userJson, User.class);
			} catch (Exception e) {
				return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
			}

			if (modelUser.authUser(user)) {
				User user_found = modelUser.getUser(user);

				TokenKey tokenKey = TokenKey.getInstance();
				Key key = tokenKey.getKey();
				TokenIssuer ti = new TokenIssuer(key);
				String jwt = ti.issueToken(user_found.getLogin(), user_found.getRole());

				Token new_token = new Token(jwt);
				token = jsonb.toJson(new_token);
				return Response.ok(token).build();
			}
		}
		return Response.status(Response.Status.UNAUTHORIZED).build();
	}

	@POST
	@Path("/registration")
	public Response registration(String userJson) {
		User application;
		try {

			try {
				application = jsonb.fromJson(userJson, User.class);
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			if (modelApplications.addAplication(application)) {
				return Response.status(Response.Status.OK).build();
			}

		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.CONFLICT).build();
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
		Product product;
		try {

			try {
				product = jsonb.fromJson(productJson, Product.class);
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			if (modelCart.addToCart(login, product)) {
				return Response.status(Response.Status.OK).build();
			}
			
		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.CONFLICT).build();
	}

	@DELETE
	@AuthRequired
	@Path("/cart")
	public Response removal(@Context HttpHeaders httpHeaders) {
		String jsonDeleteID = httpHeaders.getHeaderString("Data");
		List<Product> productsID;
		try {

			try {
				productsID = jsonb.fromJson(jsonDeleteID, new ArrayList<Product>() {
				}.getClass().getGenericSuperclass());
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			modelCart.deleteProduct(productsID);
		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}