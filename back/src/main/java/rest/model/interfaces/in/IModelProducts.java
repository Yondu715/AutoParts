package rest.model.interfaces.in;

import java.util.ArrayList;
import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.out.IRepositoryProducts;

public interface IModelProducts {

	public void setRepository(IRepositoryProducts repProducts);

	public void addProduct(Product product);

	public void deleteProduct(List<Product> productsID);

	public ArrayList<Product> getProducts(String seller_name);

	public Product getProductInfo(Integer product_id);

	public void buyProduct(List<Product> productsID);
}
