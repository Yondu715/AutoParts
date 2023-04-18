package rest.model;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.in.IModelCart;
import rest.model.interfaces.out.IRepositoryCart;

public class ModelCart implements IModelCart {

	private IRepositoryCart repCart;

	@Override
	public boolean addToCart(String login, Product product) {
		return repCart.add(login, product.getId());
	}

	@Override
	public List<Product> getCart(String login) {
		return repCart.findByLogin(login);
	}

	@Override
	public void setRepository(IRepositoryCart repCart) {
		this.repCart = repCart;
	}

	@Override
	public void deleteProduct(List<Product> productsID) {
		for (Product product : productsID) {
			repCart.delete(product.getId());
		}
	}
	
}
