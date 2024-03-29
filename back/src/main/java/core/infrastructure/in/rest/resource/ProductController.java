package core.infrastructure.in.rest.resource;

import java.util.List;

import core.application.dto.Product;
import core.application.in.service.products.api.IProductsService;
import core.infrastructure.builder.Build;
import core.infrastructure.in.rest.interceptor.AuthRequired;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/products")
public class ProductController {

	@Inject
	@Build
	private IProductsService productsService;

	@Context
	ContainerRequestContext requestContext;

	private Jsonb jsonb = JsonbBuilder.create();

	@GET
	@AuthRequired
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProducts() {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		List<Product> products = productsService.getProducts();
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@POST
	@AuthRequired
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response sale(String jsonSale) {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		try {
			Product product = jsonb.fromJson(jsonSale, Product.class);
			productsService.addProduct(product);
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@GET
	@AuthRequired
	@Path("/{product_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProductInfo() {
		String error = requestContext.getProperty("error").toString();
		if (error.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String productId = requestContext.getUriInfo().getPathParameters().getFirst("product_id");
		Product product = productsService.getProductById(Integer.parseInt(productId));
		String resultJson = jsonb.toJson(product);
		return Response.ok(resultJson).build();
	}

}