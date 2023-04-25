package rest.model;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.in.ICartModel;
import rest.model.interfaces.out.ICartsRepository;

public class CartModel implements ICartModel {

	private ICartsRepository cartsRepository;

	@Override
	public boolean addToCart(String login, Product product) {
		return cartsRepository.add(login, product.getId());
	}

	@Override
	public List<Product> getCart(String login) {
		return cartsRepository.findByLogin(login);
	}

	@Override
	public void setRepository(ICartsRepository cartsRepository) {
		this.cartsRepository = cartsRepository;
	}

	@Override
	public void deleteProduct(List<Product> productsId) {
		for (Product product : productsId) {
			cartsRepository.delete(product.getId());
		}
	}
	
}
