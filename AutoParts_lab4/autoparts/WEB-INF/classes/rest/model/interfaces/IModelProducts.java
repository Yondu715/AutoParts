package rest.model.interfaces;

import java.util.ArrayList;
import java.util.List;

import rest.model.dataObject.Product;

public interface IModelProducts {
	public void addProduct(Product product);

	public void deleteProduct(List<Product> productsID);

	public ArrayList<Product> getProducts(String seller_name);

	public Product getProductInfo(Integer product_id);
}
