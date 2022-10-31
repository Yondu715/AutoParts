package rest.model;

import rest.db.IDatabase;
import rest.db.builder.DBBuilder;
import rest.model.dataObject.User;
import rest.model.interfaces.IModelUser;

public class ModelUser implements IModelUser {

	private IDatabase db = DBBuilder.createInstance();

	@Override
	public boolean authUser(User user) {
		return db.authUser(user.getLogin(), user.getPassword());
	}

	@Override
	public boolean addUser(User user) {
		return db.addUser(user.getLogin(), user.getPassword());
	}
	
}
