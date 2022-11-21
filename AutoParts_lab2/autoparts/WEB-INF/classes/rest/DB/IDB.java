package rest.DB;

import java.sql.Connection;
import java.util.ArrayList;

import rest.DataObject.Product;

public abstract interface IDB {
	public Connection getConnection();
	public void closeConnection();
	public boolean authUser(String login, String password);
	public boolean registerUser(String login, String password);
	public ArrayList<Product> getAllProduct();
	public ArrayList<Product> getUserProduct(String seller_name);
	public void addProduct(Product product);
	public void deleteProduct(Integer productID);
}
