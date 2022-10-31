package rest.db;

import java.util.ArrayList;

import rest.model.dataObject.Product;

public abstract interface IDatabase {
	public boolean authUser(String login, String password);

	public boolean addUser(String login, String password);

	public ArrayList<Product> getAllProducts();

	public ArrayList<Product> getUserProducts(String seller_name);

	public void addProduct(Product product);

	public void deleteProduct(Integer productID);
}
