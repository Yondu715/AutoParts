package rest.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.inject.Inject;
import rest.model.dto.Product;
import rest.model.interfaces.model.IModelProducts;
import rest.model.interfaces.repos.IRepositoryProducts;

public class ModelProducts implements IModelProducts {

	@Inject
	private IRepositoryProducts repProducts;
	//private IRepositoryProducts repProducts = (RepositoryProducts) DBBuilder.createRepository(typeOfRep.PRODUCTS);

	@Override
	public void addProduct(Product product) {
		repProducts.add(product);
	}

	@Override
	public void deleteProduct(List<Product> productsID) {
		for (Product product : productsID) {
			repProducts.delete(product.getId());
		}
	}

	@Override
	public ArrayList<Product> getProducts(String seller_name) {
		ArrayList<Product> products = null;
		if (seller_name == null) {
			products = repProducts.findAll();
		} else {
			products = repProducts.findByUser(seller_name);
		}
		return products;
	}

	@Override
	public Product getProductInfo(Integer product_id){
		return repProducts.findById(product_id);
	}

}
