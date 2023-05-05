package core.application.repositories.cart.api;

import java.util.List;

import core.application.dto.Cart;

public interface ICartsRepository {
	
	public List<Cart> findByLogin(String login);

	public boolean add(String login, Integer productId);

	public void delete(Integer productId);
}
