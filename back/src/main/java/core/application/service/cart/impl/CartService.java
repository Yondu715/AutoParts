package core.application.service.cart.impl;

import java.util.List;

import core.application.dto.Cart;
import core.application.dto.Product;
import core.application.repository.cart.api.ICartsRepository;
import core.application.service.cart.api.ICartService;

public class CartService implements ICartService {

	private ICartsRepository cartsRepository;

	@Override
	public void setRepository(ICartsRepository cartsRepository) {
		this.cartsRepository = cartsRepository;
	}

	@Override
	public boolean addToCart(Integer userId, Product product) {
		return cartsRepository.add(userId, product.getId());
	}

	@Override
	public List<Cart> getCart(Integer userId) {
		return cartsRepository.findByUser(userId);
	}

	@Override
	public void deleteProduct(List<Integer> productsId) {
		for (Integer id : productsId) {
			cartsRepository.delete(id);
		}
	}

}
