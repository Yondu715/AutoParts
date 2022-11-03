package rest.model;

import java.util.ArrayList;
import java.util.List;

import rest.db.builder.DBBuilder;
import rest.db.interfaces.IRepositoryProducts;
import rest.db.repos.RepositoryProducts;
import rest.db.repos.typeOfRep;

import rest.model.dataObject.Product;
import rest.model.interfaces.IModelProducts;

public class ModelProducts implements IModelProducts {

	private IRepositoryProducts repProducts = (RepositoryProducts) DBBuilder.createRepository(typeOfRep.PRODUCTS);

	@Override
	public void addProduct(Product product) {
		repProducts.add(product);
	}

	@Override
	public void deleteProduct(List<Product> productsID) {
		for (int i = 0; i < productsID.size(); i++) {
			repProducts.delete(productsID.get(i).getId());
		}

	}

	@Override
	public ArrayList<Product> getProducts(String seller_name) {
		if (seller_name == null) {
			return repProducts.getAll();
		} else {
			return repProducts.getByUser(seller_name);
		}
	}

}
