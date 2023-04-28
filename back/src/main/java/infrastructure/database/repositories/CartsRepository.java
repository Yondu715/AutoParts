package infrastructure.database.repositories;

import java.util.List;

import application.dto.Cart;
import application.interfaces.out.ICartsRepository;
import infrastructure.database.entities.ECart;
import infrastructure.database.entities.EProduct;
import infrastructure.database.entities.EUser;
import infrastructure.utils.cartStruct;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.UserTransaction;

public class CartsRepository implements ICartsRepository {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Resource
	private UserTransaction userTransaction;

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
			userTransaction.begin();
			entityManager.joinTransaction();
			if (addStatus) {
				ECart eCart = new ECart();
				eCart.setProduct(eProduct);
				eCart.setUser(eUser);
				entityManager.persist(eCart);
				userTransaction.commit();
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
			userTransaction.begin();
			entityManager.joinTransaction();
			query.executeUpdate();
			userTransaction.commit();
		} catch (Exception e) {
		} finally {
			entityManager.close();
		}
	}

}
