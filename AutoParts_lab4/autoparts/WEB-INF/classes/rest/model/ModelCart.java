package rest.model;

import java.util.ArrayList;

import jakarta.inject.Inject;
import rest.model.dto.Product;
import rest.model.interfaces.model.IModelCart;
import rest.model.interfaces.repos.IRepositoryCart;

public class ModelCart implements IModelCart {

	@Inject
	private IRepositoryCart repCart;

	@Override
	public boolean addToCart(String login, Product product) {
		return repCart.add(login, product);
	}

	@Override
	public ArrayList<Product> getCart(String login) {
		return repCart.findByUser(login);
	}
	
}
