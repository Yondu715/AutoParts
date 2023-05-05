package core.application.services.products.api;

import java.util.List;

import core.application.dto.Product;
import core.application.repositories.products.api.IProductsRepository;

public interface IProductsService {

	public void setRepository(IProductsRepository repProducts);

	public void addProduct(Product product);

	public void deleteProduct(List<Integer> productsId);

	public List<Product> getProducts();

	public List<Product> getProductsBySeller(String sellerName);

	public Product getProduct(Integer productId);

}
