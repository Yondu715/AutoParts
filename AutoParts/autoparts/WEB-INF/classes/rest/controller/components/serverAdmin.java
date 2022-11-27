package rest.controller.components;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;

import java.util.ArrayList;
import java.util.List;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import rest.builder.Build;
import rest.controller.interceptor.AuthRequired;
import rest.model.dto.User;
import rest.model.interfaces.in.IModelApplications;
import rest.model.interfaces.in.IModelUser;

@Path("/admin")
public class serverAdmin {

	@Inject
	@Build
	private IModelApplications modelApplications;

	@Inject @Build
	private IModelUser modelUser;

	private Jsonb jsonb = JsonbBuilder.create();

	@GET
	@AuthRequired
	@Path("/applications")
	public Response getApplications() {
		ArrayList<User> userApplications = modelApplications.getApplications();
		String resultJson = jsonb.toJson(userApplications);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/applications")
	public Response removal_application(@Context HttpHeaders httpHeaders){
		String jsonDeleteID = httpHeaders.getHeaderString("Data");
		List<User> userApplicationsID = jsonb.fromJson(jsonDeleteID, new ArrayList<User>(){}.getClass().getGenericSuperclass());
		modelApplications.deleteApplication(userApplicationsID);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@AuthRequired
	@Path("/applications")
	public Response accept(String userApplicationsJson){
		List<User> userApplications = jsonb.fromJson(userApplicationsJson, new ArrayList<User>() {
		}.getClass().getGenericSuperclass());
		modelApplications.acceptApplication(userApplications);
		return Response.status(Response.Status.ACCEPTED).build();
	}

	@GET
	@AuthRequired
	@Path("/users")
	public Response getUsers() {
		ArrayList<User> users = modelUser.getUsers();
		String resultJson = jsonb.toJson(users);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/users")
	public Response removal_user(@Context HttpHeaders httpHeaders) {
		String jsonDeleteID = httpHeaders.getHeaderString("Data");
		List<User> usersID = jsonb.fromJson(jsonDeleteID, new ArrayList<User>() {
		}.getClass().getGenericSuperclass());
		modelUser.deleteUser(usersID);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

}