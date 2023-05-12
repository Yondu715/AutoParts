package core.application.in.service.cart.api;

import java.util.List;

import core.application.dto.Cart;
import core.application.dto.Product;
import core.application.out.repository.cart.api.ICartsRepository;

public interface ICartService {

	public void setRepository(ICartsRepository repCart);

	public boolean addToCart(Integer userId, Product product);

	public List<Cart> getCart(Integer userId);

	public void deleteProduct(List<Integer> productsId);
}
