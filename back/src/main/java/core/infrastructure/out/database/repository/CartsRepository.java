package core.infrastructure.out.database.repository;

import java.util.List;

import core.application.dto.Cart;
import core.application.out.repository.cart.api.ICartsRepository;
import core.infrastructure.out.database.entity.ECartItem;
import core.infrastructure.out.database.entity.EProduct;
import core.infrastructure.out.database.entity.EUser;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import utils.mapper.cartStruct;

@Named
public class CartsRepository implements ICartsRepository {

	@PersistenceContext(unitName = "autoparts_PersistenceUnit")
	private EntityManager entityManager;

	@Override
	@Transactional
	public boolean add(Integer userId, Integer productId) {
		TypedQuery<EUser> getUser = entityManager.createQuery("select u from EUser u where u.id=:id",
				EUser.class);
		getUser.setParameter("id", userId);
		EUser eUser = getUser.getSingleResult();

		TypedQuery<EProduct> getProduct = entityManager.createQuery("select p from EProduct p where p.id=:id",
				EProduct.class);
		getProduct.setParameter("id", productId);
		EProduct eProduct = getProduct.getSingleResult();

		TypedQuery<Long> countCarts = entityManager.createQuery(
				"select count(c) from ECartItem c join fetch c.user u join fetch c.product p where u.id=:id and p=:product",
				Long.class);
		countCarts.setParameter("id", userId);
		countCarts.setParameter("product", eProduct);
		boolean addStatus = countCarts.getSingleResult() == 0;
		try {
			if (addStatus) {
				ECartItem eCart = new ECartItem();
				eCart.setProduct(eProduct);
				eCart.setUser(eUser);
				entityManager.persist(eCart);
			}
		} catch (Exception e) {
			return false;
		}
		return addStatus;
	}

	@Override
	@Transactional
	public void delete(Integer productId) {
		TypedQuery<ECartItem> query = entityManager.createQuery("delete from ECartItem c where c.id=:id", ECartItem.class);
		query.setParameter("id", productId);
		query.executeUpdate();
	}

	@Override
	public List<Cart> findByUser(Integer userId) {
		TypedQuery<ECartItem> query = entityManager.createQuery(
				"select c from ECartItem c join fetch c.user u where u.id=:id",
				ECartItem.class);
		query.setParameter("id", userId);
		List<ECartItem> cartList = query.getResultList();
		List<Cart> carts = cartStruct.toCart(cartList);
		return carts;
	}

}
