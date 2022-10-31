package rest.model;

import java.util.ArrayList;
import java.util.List;

import rest.db.IDatabase;
import rest.db.builder.DBBuilder;
import rest.model.dataObject.Product;
import rest.model.interfaces.IModelProducts;

public class ModelProducts implements IModelProducts {

	private IDatabase db = DBBuilder.createInstance();

	@Override
	public void addProduct(Product product) {
		db.addProduct(product);
	}

	@Override
	public void deleteProduct(List<Product> productsID) {
		for (int i = 0; i < productsID.size(); i++) {
			db.deleteProduct(productsID.get(i).getId());
		}
		
	}

	@Override
	public ArrayList<Product> getProducts(String seller_name) {
		if (seller_name == null){
			return db.getAllProducts();
		} else {
			return db.getUserProducts(seller_name);
		}
	}
	
}
