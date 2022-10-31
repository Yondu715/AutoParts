package rest.db.interfaces;

import java.util.ArrayList;

import rest.model.dataObject.Product;

public interface IRepositoryProducts {
	public ArrayList<Product> getAllProducts();

	public ArrayList<Product> getUserProducts(String seller_name);

	public void addProduct(Product product);

	public void deleteProduct(Integer productID);
}
