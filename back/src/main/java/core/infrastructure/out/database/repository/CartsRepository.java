package core.infrastructure.out.database.repository;

import java.util.List;

import core.application.dto.Cart;
import core.application.repositories.cart.api.ICartsRepository;
import core.infrastructure.out.database.entity.ECart;
import core.infrastructure.out.database.entity.EProduct;
import core.infrastructure.out.database.entity.EUser;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.persistence.TypedQuery;
import utils.cartStruct;

@Stateless
public class CartsRepository implements ICartsRepository {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Override
	public List<Cart> findByLogin(String login) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<ECart> query = entityManager.createQuery(
				"select c from ECart c join fetch c.user u where u.login=:login",
				ECart.class);
		query.setParameter("login", login);
		List<ECart> cartList = query.getResultList();
		List<Cart> carts = cartStruct.toCart(cartList);
		entityManager.close();
		return carts;
	}

	@Override
	public boolean add(String login, Integer productId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> getUser = entityManager.createQuery("select u from EUser u where u.login=:login",
				EUser.class);
		getUser.setParameter("login", login);
		EUser eUser = getUser.getSingleResult();

		TypedQuery<EProduct> getProduct = entityManager.createQuery("select p from EProduct p where p.id=:id",
				EProduct.class);
		getProduct.setParameter("id", productId);
		EProduct eProduct = getProduct.getSingleResult();

		TypedQuery<Long> countCarts = entityManager.createQuery(
				"select count(c) from ECart c join fetch c.user u join fetch c.product p where u.login=:login and p=:product",
				Long.class);
		countCarts.setParameter("login", login);
		countCarts.setParameter("product", eProduct);
		boolean addStatus = countCarts.getSingleResult() == 0;
		try {
			entityManager.joinTransaction();
			if (addStatus) {
				ECart eCart = new ECart();
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
	public void delete(Integer productId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<ECart> query = entityManager.createQuery("delete from ECart c where c.id=:id", ECart.class);
		query.setParameter("id", productId);
		try {
			entityManager.joinTransaction();
			query.executeUpdate();
		} catch (Exception e) {
		} finally {
			entityManager.close();
		}
	}

}
