package rest.model.interfaces.out;

import java.util.ArrayList;

import rest.model.dto.Product;

public interface IRepositoryProducts {
	
	public ArrayList<Product> findAll();

	public Product findById(Integer id);

	public ArrayList<Product> findByUser(String seller_name);

	public void add(Product product);

	public void delete(Integer productID);
}
