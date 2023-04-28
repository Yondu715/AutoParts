package application.interfaces.in;

import java.util.List;

import application.dto.Product;
import application.interfaces.out.IProductsRepository;

public interface IProductsModel {

	public void setRepository(IProductsRepository repProducts);

	public void addProduct(Product product);

	public void deleteProduct(List<Integer> productsId);

	public List<Product> getProducts(String sellerName);

	public Product getProductInfo(Integer productId);

}
