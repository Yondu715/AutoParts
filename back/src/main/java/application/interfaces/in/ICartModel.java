package application.interfaces.in;

import java.util.List;

import application.dto.Cart;
import application.dto.Product;
import application.interfaces.out.ICartsRepository;

public interface ICartModel {

	public void setRepository(ICartsRepository repCart);

	public boolean addToCart(String login, Product product);

	public List<Cart> getCart(String login);

	public void deleteProduct(List<Integer> productsId);
}
