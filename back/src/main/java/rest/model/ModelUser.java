package rest.model;

import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.in.IModelUser;
import rest.model.interfaces.out.IRepositoryUsers;

public class ModelUser implements IModelUser {

	private IRepositoryUsers repUser;

	@Override
	public void setRepository(IRepositoryUsers repUsers) {
		this.repUser = repUsers;
	}

	@Override
	public boolean authUser(User user) {
		User foundUser = repUser.findByLogin(user.getLogin());
		if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
			return true;
		}
		return false;
	}

	@Override
	public boolean addUser(User user) {
		return repUser.add(user);
	}

	@Override
	public User getUser(User user) {
		return repUser.findByLogin(user.getLogin());
	}

	@Override
	public List<User> getUsers() {
		return repUser.findAll();
	}

	@Override
	public void deleteUser(List<User> users_id) {
		for (User user : users_id) {
			repUser.delete(user.getId());
		}
	}

}
