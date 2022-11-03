package rest.model;

import rest.db.builder.DBBuilder;
import rest.db.interfaces.IRepositoryUsers;
import rest.db.repos.RepositoryUsers;
import rest.db.repos.typeOfRep;

import rest.model.dataObject.User;
import rest.model.interfaces.IModelUser;

public class ModelUser implements IModelUser {

	private IRepositoryUsers repUser = (RepositoryUsers) DBBuilder.createRepository(typeOfRep.USER);

	@Override
	public boolean authUser(User user) {
		return repUser.check(user);
	}

	@Override
	public boolean addUser(User user) {
		return repUser.add(user);
	}

}
