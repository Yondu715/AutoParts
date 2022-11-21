package rest.model;

import jakarta.inject.Inject;
import rest.model.dto.User;
import rest.model.interfaces.model.IModelUser;
import rest.model.interfaces.repos.IRepositoryUsers;

public class ModelUser implements IModelUser {

	@Inject
	private IRepositoryUsers repUser;
	//private IRepositoryUsers repUser = (RepositoryUsers) DBBuilder.createRepository(typeOfRep.USER);

	@Override
	public boolean authUser(User user) {
		return repUser.find(user);
	}

	@Override
	public boolean addUser(User user) {
		return repUser.add(user);
	}

}
