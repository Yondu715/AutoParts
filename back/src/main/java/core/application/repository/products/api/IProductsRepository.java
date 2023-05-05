package core.application.repository.products.api;

import java.util.List;

import core.application.dto.Product;

public interface IProductsRepository {
	
	public List<Product> findAll();

	public Product findById(Integer id);

	public List<Product> findByUser(String sellerName);

	public void add(Product product);

	public void delete(Integer productId);
}
