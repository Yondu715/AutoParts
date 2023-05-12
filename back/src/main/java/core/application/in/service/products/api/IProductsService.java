package core.application.in.service.products.api;

import java.util.List;

import core.application.dto.Product;
import core.application.out.repository.products.api.IProductsRepository;

public interface IProductsService {

	public void setRepository(IProductsRepository repProducts);

	public void addProduct(Product product);

	public void deleteProduct(List<Integer> productsId);

	public List<Product> getProducts();

	public List<Product> getProductsByUser(Integer userId);

	public Product getProductById(Integer productId);

}
