package rest.model.interfaces.model;

import rest.model.dto.User;

public interface IModelUser {

	public boolean authUser(User user);

	public boolean addUser(User user);
}
