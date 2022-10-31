package rest.model;

import rest.db.builder.DBBuilder;
import rest.db.interfaces.IRepositoryUser;
import rest.db.repos.UserRepository;
import rest.db.repos.typeOfRep;
import rest.model.dataObject.User;
import rest.model.interfaces.IModelUser;

public class ModelUser implements IModelUser {

	private IRepositoryUser db = (UserRepository) DBBuilder.createRepository(typeOfRep.USER);

	@Override
	public boolean authUser(User user) {
		return db.checkUser(user.getLogin(), user.getPassword());
	}

	@Override
	public boolean addUser(User user) {
		return db.addUser(user.getLogin(), user.getPassword());
	}

}
