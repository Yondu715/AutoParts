package core.infrastructure.in.rest.resource;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import java.util.ArrayList;
import java.util.List;

import core.application.dto.Cart;
import core.application.dto.Product;
import core.application.dto.User;
import core.application.in.service.cart.api.ICartService;
import core.application.in.service.products.api.IProductsService;
import core.application.in.service.token.api.ITokenService;
import core.application.in.service.user.api.IUserService;
import core.infrastructure.builder.Build;
import core.infrastructure.in.rest.interceptor.AuthRequired;
import jakarta.inject.Inject;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users")
public class UserController {

	@Inject
	@Build
	private IUserService userService;

	@Inject
	@Build
	private IProductsService productsService;

	@Inject
	@Build
	private ICartService cartService;

	@Inject @Build
	private ITokenService tokenService;

	@Context
	private ContainerRequestContext requestContext;

	private Jsonb jsonb = JsonbBuilder.create();

	@POST
	@AuthRequired
	@Path("/auth")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authorization(String userJson) {
		String error = requestContext.getProperty("error").toString();
		if (!error.equals("Not valid token")) {
			return Response.status(Response.Status.NO_CONTENT).build();
		}

		if (userJson.isEmpty()) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}

		try {
			User user = jsonb.fromJson(userJson, User.class);
			if (!userService.authUser(user)) {
				return Response.status(Response.Status.UNAUTHORIZED).build();
			}
			User userFound = userService.getUser(user);
			String token = tokenService.getToken(jsonb.toJson(userFound));
			return Response.ok(token).build();
		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
	}

	@POST
	@Path("/registration")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registration(String userJson) {
		try {
			User user = jsonb.fromJson(userJson, User.class);
			if (userService.addUser(user)) {
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
	@Path("/{user_id}/products")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProductsByUser() {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String userId = requestContext.getUriInfo().getPathParameters().getFirst("user_id").toString();
		List<Product> products = productsService.getProductsByUser(Integer.parseInt(userId));
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/{user_id}/products")
	public Response removalProducts() {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteId = requestContext.getProperty("data").toString();
		try {
			List<Integer> productsId = jsonb.fromJson(jsonDeleteId, new ArrayList<Integer>() {
			}.getClass().getGenericSuperclass());
			productsService.deleteProduct(productsId);
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@GET
	@AuthRequired
	@Path("/{user_id}/cart")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCart() {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String userId = requestContext.getUriInfo().getPathParameters().getFirst("user_id").toString();
		List<Cart> products = cartService.getCart(Integer.parseInt(userId));
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@POST
	@AuthRequired
	@Path("/{user_id}/cart")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addCart(String productJson) {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String userId = requestContext.getUriInfo().getPathParameters().getFirst("user_id").toString();
		try {
			Product product = jsonb.fromJson(productJson, Product.class);
			if (cartService.addToCart(Integer.parseInt(userId), product)) {
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
	@Path("/{user_id}/cart")
	public Response removalCartProduct() {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteId = requestContext.getProperty("data").toString();
		try {
			List<Integer> productsId = jsonb.fromJson(jsonDeleteId, new ArrayList<Integer>() {
			}.getClass().getGenericSuperclass());
			cartService.deleteProduct(productsId);
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}