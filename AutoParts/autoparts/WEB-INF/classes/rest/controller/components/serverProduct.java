package rest.controller.components;

import java.util.ArrayList;
import java.util.List;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import rest.builder.Built;
import rest.controller.interceptor.AuthRequired;
import rest.model.dto.Product;
import rest.model.interfaces.in.IModelProducts;

@Path("/products")
public class serverProduct {
	@Inject @Built
	private IModelProducts model;
	private Jsonb jsonb = JsonbBuilder.create();

	@GET
	@AuthRequired
	@Path("/")
	public Response getProducts() {
		ArrayList<Product> products = model.getProducts(null);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@GET
	@AuthRequired
	@Path("/userProducts")
	public Response getProductsByUser(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		ArrayList<Product> products = model.getProducts(login);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@GET
	@AuthRequired
	@Path("/{product_id}")
	public Response getProductInfo(@Context UriInfo info) {
		String product_id = info.getPathParameters().getFirst("product_id");
		Product product = model.getProductInfo(Integer.parseInt(product_id));
		String resultJson = jsonb.toJson(product);
		return Response.ok(resultJson).build();
	}

	@POST
	@AuthRequired
	@Path("/sale")
	public Response sale(String jsonSale) {
		Product product = jsonb.fromJson(jsonSale, Product.class);
		model.addProduct(product);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@DELETE
	@AuthRequired
	@Path("/userProducts")
	public Response removal(@Context HttpHeaders httpHeaders) {
		String jsonDeleteID = httpHeaders.getHeaderString("Data");
		List<Product> productsID = jsonb.fromJson(jsonDeleteID, new ArrayList<Product>() {
		}.getClass().getGenericSuperclass());
		model.deleteProduct(productsID);
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}