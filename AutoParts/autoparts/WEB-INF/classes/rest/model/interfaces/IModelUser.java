package rest.model.interfaces;

import rest.model.dataObject.User;

public interface IModelUser {

	public boolean authUser(User user);
	public boolean addUser(User user);
}
