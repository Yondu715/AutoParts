package rest.model.interfaces.out;

import rest.model.dto.User;

public interface IRepositoryUsers {
	
	public boolean find(User user);

	public boolean add(User user);
}
