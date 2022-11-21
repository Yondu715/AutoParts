package rest.server.components;

import java.util.ArrayList;
import java.util.List;

import jakarta.ws.rs.Path;
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
import rest.model.dto.Product;
import rest.model.interfaces.model.IModelProducts;
import rest.server.token.Token;

@Path("/products")
public class serverProduct {
	@Inject
	private IModelProducts model;
	private Jsonb jsonb = JsonbBuilder.create();

	@GET
	@Path("/")
	public Response getProducts(@Context HttpHeaders httpHeaders) {
		String token = httpHeaders.getHeaderString("Authorization");
		if (!Token.checkToken(token)) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		ArrayList<Product> products = model.getProducts(null);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@GET
	@Path("/userProducts")
	public Response getProductsByUser(@Context HttpHeaders httpHeaders) {
		String token = httpHeaders.getHeaderString("Authorization");
		String login = httpHeaders.getHeaderString("login");
		if (!Token.checkToken(token)) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		ArrayList<Product> products = model.getProducts(login);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@GET
	@Path("/{product_id}")
	public Response getProductInfo(@Context HttpHeaders httpHeaders, @Context UriInfo info) {
		String token = httpHeaders.getHeaderString("Authorization");
		if (!Token.checkToken(token)) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String product_id = info.getPathParameters().getFirst("product_id");
		Product product = model.getProductInfo(Integer.parseInt(product_id));
		String resultJson = jsonb.toJson(product);
		return Response.ok(resultJson).build();
	}

	@POST
	@Path("/sale")
	public Response sale(@Context HttpHeaders httpHeaders, String jsonSale) {
		String token = httpHeaders.getHeaderString("Authorization");
		if (!Token.checkToken(token)) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		Product product = jsonb.fromJson(jsonSale, Product.class);
		model.addProduct(product);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@DELETE
	@Path("/userProducts")
	public Response removal(@Context HttpHeaders httpHeaders) {
		String jsonDeleteID = httpHeaders.getHeaderString("Data");
		String token = httpHeaders.getHeaderString("Authorization");
		if (!Token.checkToken(token)) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		List<Product> productsID = jsonb.fromJson(jsonDeleteID, new ArrayList<Product>() {
		}.getClass().getGenericSuperclass());
		model.deleteProduct(productsID);
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}