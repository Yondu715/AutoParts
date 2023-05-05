package core.infrastructure.in.rest.resource;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;

import java.util.ArrayList;
import java.util.List;

import core.application.dto.User;
import core.application.service.application.api.IApplicationService;
import core.application.service.user.api.IUserService;
import core.infrastructure.builder.Build;
import core.infrastructure.in.rest.interceptor.AuthRequired;
import jakarta.inject.Inject;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/admin")
public class AdminController {

	@Inject
	@Build
	private IApplicationService applicationService;

	@Inject
	@Build
	private IUserService userModel;

	private Jsonb jsonb = JsonbBuilder.create();

	@GET
	@AuthRequired
	@Path("/applications")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getApplications(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		List<User> userApplications = applicationService.getApplications();
		String resultJson = jsonb.toJson(userApplications);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/applications")
	@Produces(MediaType.APPLICATION_JSON)
	public Response removalApplication(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteId = requestContext.getProperty("data").toString();
		try {
			List<Integer> userApplicationsId = jsonb.fromJson(jsonDeleteId, new ArrayList<Integer>() {
			}.getClass().getGenericSuperclass());
			applicationService.deleteApplication(userApplicationsId);
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	@PUT
	@AuthRequired
	@Path("/applications")
	@Produces(MediaType.APPLICATION_JSON)
	public Response acceptApplication(@Context ContainerRequestContext requestContext, String userApplicationsJson) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		try {
			List<User> userApplications = jsonb.fromJson(userApplicationsJson, new ArrayList<User>() {
			}.getClass().getGenericSuperclass());
			applicationService.acceptApplication(userApplications);
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.ACCEPTED).build();
	}

	@GET
	@AuthRequired
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsers(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		List<User> users = userModel.getAllUsers();
		String resultJson = jsonb.toJson(users);
		return Response.ok(resultJson).build();
	}

	@DELETE
	@AuthRequired
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	public Response removalUser(@Context ContainerRequestContext requestContext) {
		String login = requestContext.getProperty("login").toString();
		if (login.equals("Not valid token")) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		String jsonDeleteId = requestContext.getProperty("data").toString();
		try {
			List<Integer> usersId = jsonb.fromJson(jsonDeleteId, new ArrayList<Integer>() {
			}.getClass().getGenericSuperclass());
			userModel.deleteUser(usersId);
		} catch (JsonbException | IllegalArgumentException e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
		}
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}