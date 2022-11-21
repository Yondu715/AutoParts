package rest.Server;

import jakarta.ws.rs.Path;

import java.util.ArrayList;
import java.util.List;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.Response;
import rest.DB.DBBuilder;
import rest.DB.IDB;
import rest.DataObject.Product;


@Path("/products")
public class serverProduct {
	private Jsonb jsonb = JsonbBuilder.create();
	private IDB db = DBBuilder.buildDB();

	@GET
	@Path("/")
	public Response getProducts(@HeaderParam(value="Authorization") String authInfo) {
		if (!checkSession(authInfo)) {
			return Response.ok("No access").build();
		}
		ArrayList<Product> products = db.getAllProduct();
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@GET
	@Path("/userProduct")
	public Response getUserProduct(@HeaderParam(value="Authorization") String authInfo) {
		if (!checkSession(authInfo)) {
			return Response.ok("No access").build();
		}
		String seller_name = authInfo.split(";")[0];
		ArrayList<Product> products = db.getUserProduct(seller_name);
		String resultJson = jsonb.toJson(products);
		return Response.ok(resultJson).build();
	}

	@POST
	@Path("/sale")
	public Response sale(@HeaderParam(value="Authorization") String authInfo, String jsonSale) {
		if (!checkSession(authInfo)) {
			return Response.ok("No access").build();
		}
		Product product = jsonb.fromJson(jsonSale, Product.class);
		db.addProduct(product);
		return Response.ok().build();
	}

	@POST
	@Path("/removal")
	public Response removal(@HeaderParam(value="Authorization") String authInfo, String jsonDeleteID) {
		if (!checkSession(authInfo)) {
			return Response.ok("No access").build();
		}
		List<Product> productsID = jsonb.fromJson(jsonDeleteID, new ArrayList<Product>() {
		}.getClass().getGenericSuperclass());
		for (int i = 0; i < productsID.size(); i++) {
			db.deleteProduct(productsID.get(i).getId());
		}
		return Response.ok().build();
	}

	private boolean checkSession(String authInfo){
		String[] user = authInfo.split(";");
		if (!db.authUser(user[0], user[1])) {
			return false;
		}
		return true;
	}
}