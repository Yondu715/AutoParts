package application.interfaces.in;

import java.util.List;

import application.dto.User;
import application.interfaces.out.IUsersRepository;

public interface IUserService {

	public void setRepository(IUsersRepository repUsers);

	public boolean authUser(User user);

	public boolean addUser(User user);

	public User getUser(User user);

	public User getUserById(Integer id);

	public List<User> getAllUsers();

	public void deleteUser(List<Integer> usersId);
}
