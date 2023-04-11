package rest.controller.components;

import java.util.ArrayList;
import java.util.List;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import rest.builder.Build;
import rest.controller.interceptor.AuthRequired;
import rest.model.dto.Product;
import rest.model.interfaces.in.IModelProducts;

@Path("/products")
public class serverProduct {

	@Inject
	@Build
	private IModelProducts modelProducts;
	private Jsonb jsonb = JsonbBuilder.create();

	@GET
	@AuthRequired
	@Path("/")
	@Produces("application/json")
	public Response getProducts(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		ArrayList<Product> products = modelProducts.getProducts(null);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@GET
	@AuthRequired
	@Path("/userProducts")
	@Produces("application/json")
	public Response getProductsByUser(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		ArrayList<Product> products = modelProducts.getProducts(login);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/userProducts")
	@Produces("application/json")
	public Response removal(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteID = requestContext.getProperty("data").toString();
		List<Product> productsID;
		try {
			try {
				productsID = jsonb.fromJson(jsonDeleteID, new ArrayList<Product>() {
				}.getClass().getGenericSuperclass());
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			modelProducts.deleteProduct(productsID);

		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@GET
	@AuthRequired
	@Path("/{product_id}")
	@Produces("application/json")
	public Response getProductInfo(@Context ContainerRequestContext requestContext, @Context UriInfo info) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String product_id = info.getPathParameters().getFirst("product_id");
		Product product = modelProducts.getProductInfo(Integer.parseInt(product_id));
		String resultJson = jsonb.toJson(product);
		return Response.ok(resultJson).build();
	}

	@POST
	@AuthRequired
	@Path("/sale")
	@Produces("application/json")
	public Response sale(@Context ContainerRequestContext requestContext, String jsonSale) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		Product product;
		try {

			try {
				product = jsonb.fromJson(jsonSale, Product.class);
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			modelProducts.addProduct(product);

		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}

}