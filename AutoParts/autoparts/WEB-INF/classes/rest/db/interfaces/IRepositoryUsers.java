package rest.db.interfaces;

import rest.model.dataObject.User;

public interface IRepositoryUsers {
	public boolean check(User user);

	public boolean add(User user);

	public int getId(String username);

	public String getName(Integer id);
}
