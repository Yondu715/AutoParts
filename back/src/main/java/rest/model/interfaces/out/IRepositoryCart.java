package rest.model.interfaces.out;

import java.util.List;

import rest.model.dto.Product;

public interface IRepositoryCart {
	
	public List<Product> findByLogin(String login);

	public boolean add(String login, Integer productId);

	public void delete(Integer productId);
}
