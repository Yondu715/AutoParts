package rest.model;

import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.in.IUserModel;
import rest.model.interfaces.out.IUsersRepository;

public class UserModel implements IUserModel {

	private IUsersRepository usersRepository;

	@Override
	public void setRepository(IUsersRepository usersRepositorys) {
		this.usersRepository = usersRepositorys;
	}

	@Override
	public boolean authUser(User user) {
		User foundUser = usersRepository.findByLogin(user.getLogin());
		if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
			return true;
		}
		return false;
	}

	@Override
	public boolean addUser(User user) {
		return usersRepository.add(user);
	}

	@Override
	public User getUser(User user) {
		return usersRepository.findByLogin(user.getLogin());
	}

	@Override
	public List<User> getUsers() {
		return usersRepository.findAll();
	}

	@Override
	public void deleteUser(List<User> usersId) {
		for (User user : usersId) {
			usersRepository.delete(user.getId());
		}
	}

}
