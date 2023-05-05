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
	public boolean addToCart(String login, Product product) {
		return cartsRepository.add(login, product.getId());
	}

	@Override
	public List<Cart> getCart(String login) {
		return cartsRepository.findByLogin(login);
	}

	@Override
	public void deleteProduct(List<Integer> productsId) {
		for (Integer id : productsId) {
			cartsRepository.delete(id);
		}
	}

}
