package rest.model;

import java.util.ArrayList;

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
	
}
