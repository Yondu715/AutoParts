package rest.model.interfaces.model;

import java.util.ArrayList;

import rest.model.dto.Product;

public interface IModelCart {

	public boolean addToCart(String login, Product product);

	public ArrayList<Product> getCart(String login);
}
