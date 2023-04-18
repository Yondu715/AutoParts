package rest.db.repos;

import java.util.ArrayList;
import java.util.List;

import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.UserTransaction;
import rest.db.entities.ECart;
import rest.db.entities.EProduct;
import rest.db.entities.EUser;
import rest.model.dto.Product;
import rest.model.interfaces.out.IRepositoryCart;
import rest.utils.cartStruct;

public class RepositoryCart implements IRepositoryCart {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Resource
	UserTransaction userTransaction;

	@Override
	public List<Product> findByLogin(String login) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<ECart> query = entityManager.createQuery("select c from ECart c where c.user.login=:login", ECart.class);
		query.setParameter("login", login);
		List<Product> products = new ArrayList<>();
		try {
			List<ECart> cartList = query.getResultList();
			products = cartStruct.toProduct(cartList);
		} catch (Exception e) {
		} finally {
			entityManager.close();
		}
		return products;
	}

	@Override
	public boolean add(String login, Integer productId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> getUser = entityManager.createQuery("select u from EUser u where u.login=:login",
				EUser.class);
		getUser.setParameter("login", login);
		TypedQuery<EProduct> getProduct = entityManager.createQuery("select p from EProduct p where p.id=:id",
				EProduct.class);
		getProduct.setParameter("id", productId);
		boolean addStatus = true;
		try {
			userTransaction.begin();
			entityManager.joinTransaction();
			EUser eUser = getUser.getSingleResult();
			EProduct eProduct = getProduct.getSingleResult();
			ECart eCart = new ECart();
			eCart.setProduct(eProduct);
			eCart.setUser(eUser);
			entityManager.persist(eCart);
			userTransaction.commit();
		} catch (Exception e) {
			addStatus = false;
		} finally {
			entityManager.close();
		}
		return addStatus;
	}

	@Override
	public void delete(Integer productId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<ECart> query = entityManager.createQuery("delete from ECart c where c.product.id=:id", ECart.class);
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
