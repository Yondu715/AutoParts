package rest.model.interfaces.out;

import java.util.ArrayList;

import rest.model.dto.User;

public interface IRepositoryUsers {
	
	public boolean check(User user);

	public boolean add(User user);

	public User find(String login);

	public ArrayList<User> findAll();
}
