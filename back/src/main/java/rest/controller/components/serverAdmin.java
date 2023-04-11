package rest.controller.components;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;

import java.util.ArrayList;
import java.util.List;

import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.ws.rs.core.Context;
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

	@Inject
	@Build
	private IModelUser modelUser;

	private Jsonb jsonb = JsonbBuilder.create();

	@GET
	@AuthRequired
	@Path("/applications")
	@Produces("application/json")
	public Response getApplications(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")){
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		ArrayList<User> userApplications = modelApplications.getApplications();
		String resultJson = jsonb.toJson(userApplications);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/applications")
	@Produces("application/json")
	public Response removalApplication(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteID = requestContext.getProperty("data").toString();
		List<User> userApplicationsID;
		try {

			try {
				userApplicationsID = jsonb.fromJson(jsonDeleteID, new ArrayList<User>() {
				}.getClass().getGenericSuperclass());
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			modelApplications.deleteApplication(userApplicationsID);

		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@AuthRequired
	@Path("/applications")
	@Produces("application/json")
	public Response acceptApplication(@Context ContainerRequestContext requestContext, String userApplicationsJson) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		List<User> userApplications;
		try {

			try {
				userApplications = jsonb.fromJson(userApplicationsJson, new ArrayList<User>() {
				}.getClass().getGenericSuperclass());
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			modelApplications.acceptApplication(userApplications);

		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.ACCEPTED).build();
	}

	@GET
	@AuthRequired
	@Path("/users")
	@Produces("application/json")
	public Response getUsers(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		ArrayList<User> users = modelUser.getUsers();
		String resultJson = jsonb.toJson(users);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/users")
	@Produces("application/json")
	public Response removalUser(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteID = requestContext.getProperty("data").toString();
		List<User> usersID;
		try {
			try {
				usersID = jsonb.fromJson(jsonDeleteID, new ArrayList<User>() {
				}.getClass().getGenericSuperclass());
			} catch (Exception e) {
				throw new Exception("Error JSON transforming");
			}
			modelUser.deleteUser(usersID);

		} catch (JsonbException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}