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
import rest.model.dto.Application;
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
		ArrayList<Application> applications = modelApplications.getApplications();
		String resultJson = jsonb.toJson(applications);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/applications")
	public Response removal(@Context HttpHeaders httpHeaders){
		String jsonDeleteID = httpHeaders.getHeaderString("Data");
		List<Application> applicationsID = jsonb.fromJson(jsonDeleteID, new ArrayList<Application>(){}.getClass().getGenericSuperclass());
		modelApplications.deleteApplication(applicationsID);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@AuthRequired
	@Path("/applications")
	public Response accept(String applicationsJson){
		List<Application> applicationsID = jsonb.fromJson(applicationsJson, new ArrayList<Application>() {
		}.getClass().getGenericSuperclass());
		if (modelApplications.acceptApplication(applicationsID)){
			return Response.status(Response.Status.ACCEPTED).build();
		}
		return Response.status(Response.Status.BAD_REQUEST).build();
	}

	@GET
	@AuthRequired
	@Path("/users")
	public Response getUsers() {
		ArrayList<User> users = modelUser.getUsers();
		String resultJson = jsonb.toJson(users);
		return Response.ok(resultJson).build();
	}

}