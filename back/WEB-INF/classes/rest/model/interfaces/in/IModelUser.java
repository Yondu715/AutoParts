package rest.model.interfaces.in;

import java.util.ArrayList;
import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.out.IRepositoryUsers;

public interface IModelUser {

	public void setRepository(IRepositoryUsers repUsers);

	public boolean authUser(User user);

	public boolean addUser(User user);

	public User getUser(User user);

	public ArrayList<User> getUsers();

	public void deleteUser(List<User> users_id);
}
