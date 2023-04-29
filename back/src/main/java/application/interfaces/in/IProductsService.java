package application.interfaces.in;

import java.util.List;

import application.dto.Product;
import application.interfaces.out.IProductsRepository;

public interface IProductsService {

	public void setRepository(IProductsRepository repProducts);

	public void addProduct(Product product);

	public void deleteProduct(List<Integer> productsId);

	public List<Product> getProducts();

	public List<Product> getProductsBySeller(String sellerName);

	public Product getProduct(Integer productId);

}
