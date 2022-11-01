package rest.db.interfaces;

import java.util.ArrayList;

import rest.model.dataObject.Product;

public interface IRepositoryProducts {
	public ArrayList<Product> getAll();

	public ArrayList<Product> getByUser(String seller_name);

	public void add(Product product);

	public void delete(Integer productID);
}
