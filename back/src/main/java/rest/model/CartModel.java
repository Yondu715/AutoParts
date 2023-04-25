package rest.model;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.in.ICartModel;
import rest.model.interfaces.out.ICartsRepository;

public class CartModel implements ICartModel {

	private ICartsRepository repCart;

	@Override
	public boolean addToCart(String login, Product product) {
		return repCart.add(login, product.getId());
	}

	@Override
	public List<Product> getCart(String login) {
		return repCart.findByLogin(login);
	}

	@Override
	public void setRepository(ICartsRepository repCart) {
		this.repCart = repCart;
	}

	@Override
	public void deleteProduct(List<Product> productsId) {
		for (Product product : productsId) {
			repCart.delete(product.getId());
		}
	}
	
}
