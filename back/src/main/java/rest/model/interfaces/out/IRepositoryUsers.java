package rest.model.interfaces.out;

import java.util.List;

import rest.model.dto.User;

public interface IRepositoryUsers {

	public boolean add(User user);

	public boolean delete(Integer userId);

	public User findByLogin(String login);

	public List<User> findAll();

	public List<User> findWithoutRole();

	public void setRole(User user);
}
