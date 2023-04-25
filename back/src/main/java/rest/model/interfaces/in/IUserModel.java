package rest.model.interfaces.in;

import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.out.IUsersRepository;

public interface IUserModel {

	public void setRepository(IUsersRepository repUsers);

	public boolean authUser(User user);

	public boolean addUser(User user);

	public User getUser(User user);

	public List<User> getUsers();

	public void deleteUser(List<User> users_id);
}
