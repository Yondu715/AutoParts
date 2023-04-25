package rest.model.interfaces.out;

import java.util.List;

import rest.model.dto.Product;

public interface IProductsRepository {
	
	public List<Product> findAll();

	public Product findById(Integer id);

	public List<Product> findByUser(String sellerName);

	public void add(Product product);

	public void delete(Integer productId);
}
