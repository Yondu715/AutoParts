package rest.model.interfaces.in;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.out.ICartsRepository;

public interface ICartModel {

	public void setRepository(ICartsRepository repCart);

	public boolean addToCart(String login, Product product);

	public List<Product> getCart(String login);

	public void deleteProduct(List<Product> productsID);
}
