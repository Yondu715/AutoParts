package rest.Server;

import jakarta.ws.rs.Path;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.Response;
import rest.DB.DBBuilder;
import rest.DB.IDB;
import rest.DataObject.User;


@Path("/users")
public class serverUser {
	private Jsonb jsonb = JsonbBuilder.create();
	private IDB db = DBBuilder.buildDB();

	@POST
	@Path("/login")
	public Response login(String userJson) {
		User user;
		user = jsonb.fromJson(userJson, User.class);
		String login = user.getLogin();
		String password = user.getPassword();
		if (db.authUser(login, password)){
			return Response.ok("Yes").build();
		}
		return Response.ok("No").build();
	}

	@POST
	@Path("/registr")
	public Response registr(String userJson) {
		User user = jsonb.fromJson(userJson, User.class);
		String login = user.getLogin();
		String password = user.getPassword();
		if (db.registerUser(login, password)){
			return Response.ok("Yes").build();
		}
		return Response.ok("No").build();
	}
}