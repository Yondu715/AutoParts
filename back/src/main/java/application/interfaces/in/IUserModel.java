package application.interfaces.in;

import java.util.List;

import application.dto.User;
import application.interfaces.out.IUsersRepository;

public interface IUserModel {

	public void setRepository(IUsersRepository repUsers);

	public boolean authUser(User user);

	public boolean addUser(User user);

	public User getUser(User user);

	public List<User> getUsers();

	public void deleteUser(List<Integer> usersId);
}
