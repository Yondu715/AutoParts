package rest.model.interfaces.in;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.out.IRepositoryProducts;

public interface IModelProducts {

	public void setRepository(IRepositoryProducts repProducts);

	public void addProduct(Product product);

	public void deleteProduct(List<Product> productsId);

	public List<Product> getProducts(String sellerName);

	public Product getProductInfo(Integer productId);

}
