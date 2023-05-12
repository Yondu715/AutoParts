package core.application.out.repository.products.api;

import java.util.List;

import core.application.dto.Product;

public interface IProductsRepository {
	
	public List<Product> findAll();

	public Product findById(Integer id);

	public List<Product> findByUser(Integer userId);

	public void add(Product product);

	public void delete(Integer productId);
}
