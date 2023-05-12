package core.application.out.repository.cart.api;

import java.util.List;

import core.application.dto.Cart;

public interface ICartsRepository {
	
	public List<Cart> findByUser(Integer userId);

	public boolean add(Integer userId, Integer productId);

	public void delete(Integer productId);
}
