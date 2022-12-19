package rest.model;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import rest.model.dto.Product;
import rest.model.interfaces.in.IModelCart;
import rest.model.interfaces.out.IRepositoryCart;

public class ModelCart implements IModelCart {

	private IRepositoryCart repCart;

	@Override
	public boolean addToCart(String login, Product product) {
		return repCart.add(login, product);
	}

	@Override
	public ArrayList<Product> getCart(String login) {
		return repCart.findByUser(login);
	}

	@Override
	public void setRepository(IRepositoryCart repCart) {
		this.repCart = repCart;
	}

	@Override
	public void deleteProduct(List<Product> productsID) {
		for (Product product : productsID) {
			Logger.getLogger(ModelCart.class.getName()).log(Level.INFO, "" + product.getId() + " ");
			repCart.delete(product.getId());
		}
	}
	
}
