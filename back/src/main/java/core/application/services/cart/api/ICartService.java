package core.application.services.cart.api;

import java.util.List;

import core.application.dto.Cart;
import core.application.dto.Product;
import core.application.repositories.cart.api.ICartsRepository;

public interface ICartService {

	public void setRepository(ICartsRepository repCart);

	public boolean addToCart(String login, Product product);

	public List<Cart> getCart(String login);

	public void deleteProduct(List<Integer> productsId);
}
