package rest.model;

import rest.model.dto.User;
import rest.model.interfaces.in.IModelUser;
import rest.model.interfaces.out.IRepositoryUsers;

public class ModelUser implements IModelUser {

	private IRepositoryUsers repUser;

	@Override
	public boolean authUser(User user) {
		return repUser.find(user);
	}

	@Override
	public boolean addUser(User user) {
		return repUser.add(user);
	}

	@Override
	public void setRepository(IRepositoryUsers repUsers) {
		this.repUser = repUsers;		
	}

}
