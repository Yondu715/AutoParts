package core.application.in.service.user.api;

import java.util.List;

import core.application.dto.User;
import core.application.out.repository.users.api.IUsersRepository;

public interface IUserService {

	public void setRepository(IUsersRepository repUsers);

	public boolean authUser(User user);

	public boolean addUser(User user);

	public User getUser(User user);

	public User getUserById(Integer id);

	public List<User> getAllUsers();

	public void deleteUser(List<Integer> usersId);
}
