package application;

import java.util.List;

import application.dto.Cart;
import application.dto.Product;
import application.interfaces.in.ICartModel;
import application.interfaces.out.ICartsRepository;

public class CartModel implements ICartModel {

	private ICartsRepository cartsRepository;

	@Override
	public boolean addToCart(String login, Product product) {
		return cartsRepository.add(login, product.getId());
	}

	@Override
	public List<Cart> getCart(String login) {
		return cartsRepository.findByLogin(login);
	}

	@Override
	public void setRepository(ICartsRepository cartsRepository) {
		this.cartsRepository = cartsRepository;
	}

	@Override
	public void deleteProduct(List<Integer> productsId) {
		for (Integer id : productsId) {
			cartsRepository.delete(id);
		}
	}
	
}
