package rest.model.interfaces.out;

import java.util.ArrayList;

import rest.model.dto.Product;

public interface IRepositoryCart {
	
	public ArrayList<Product> findByUser(String login);

	public boolean add(String login, Product product);
}
