package rest.model;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.in.IModelProducts;
import rest.model.interfaces.out.IRepositoryProducts;

public class ModelProducts implements IModelProducts {

	private IRepositoryProducts repProducts;

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
	public List<Product> getProducts(String seller_name) {
		List<Product> products = null;
		if (seller_name == null) {
			products = repProducts.findAll();
		} else {
			products = repProducts.findByUser(seller_name);
		}
		return products;
	}

	@Override
	public Product getProductInfo(Integer productID){
		return repProducts.findById(productID);
	}

	@Override
	public void setRepository(IRepositoryProducts repProducts) {
		this.repProducts = repProducts;
	}

	@Override
	public void buyProduct(List<Product> productsID) {
		
		
	}
}
