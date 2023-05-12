package core.application.out.repository.users.api;

import java.util.List;

import core.application.dto.User;

public interface IUsersRepository {

	public boolean add(User user);

	public boolean delete(Integer userId);

	public User findById(Integer userId);

	public User findByLogin(String login);

	public List<User> findAll();

	public List<User> findWithoutRole();

	public void setRole(User user);
}
