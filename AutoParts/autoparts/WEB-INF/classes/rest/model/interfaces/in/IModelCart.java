package rest.model.interfaces.in;

import java.util.ArrayList;

import rest.model.dto.Product;
import rest.model.interfaces.out.IRepositoryCart;

public interface IModelCart {

	public void setRepository(IRepositoryCart repCart);

	public boolean addToCart(String login, Product product);

	public ArrayList<Product> getCart(String login);
}
