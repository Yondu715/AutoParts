package application;

import java.util.List;

import application.dto.User;
import application.interfaces.in.IUserService;
import application.interfaces.out.IUsersRepository;

public class UserService implements IUserService {

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
	public List<User> getAllUsers() {
		return usersRepository.findAll();
	}

	@Override
	public void deleteUser(List<Integer> usersId) {
		for (Integer id : usersId) {
			usersRepository.delete(id);
		}
	}

	@Override
	public User getUserById(Integer id) {
		return usersRepository.findById(id);
	}

}
