package rest.model.interfaces.in;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.out.IProductsRepository;

public interface IProductsModel {

	public void setRepository(IProductsRepository repProducts);

	public void addProduct(Product product);

	public void deleteProduct(List<Product> productsId);

	public List<Product> getProducts(String sellerName);

	public Product getProductInfo(Integer productId);

}
