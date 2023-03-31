package rest.db.repos;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.transaction.UserTransaction;
import rest.db.entities.ECart;
import rest.db.entities.EProduct;
import rest.db.entities.EUser;
import rest.model.dto.Product;
import rest.model.interfaces.out.IRepositoryCart;
import rest.utils.mapStruct;

public class RepositoryCart implements IRepositoryCart {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Resource
	UserTransaction userTransaction;

	@Override
	public ArrayList<Product> findByUser(String login) {
		ArrayList<Product> products = new ArrayList<>();
		String getCart = "select c from ECart c where c.user.login=:login";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<ECart> carts_list = entityManager.createQuery(getCart, ECart.class).setParameter("login", login).getResultList();
			userTransaction.commit();
			for (ECart eCart : carts_list) {
				Product product = mapStruct.toProduct(eCart.getProduct());
				products.add(product);
			}
		} catch (Exception e) {
			Logger.getLogger(RepositoryCart.class.getName()).log(Level.INFO, null, e);
		}
		return products;
	}

	@Override
	public boolean add(String login, Product product) {
		String getUser = "select u from EUser u where u.login=:login";
		String getProduct = "select p from EProduct p where p.id=:id";
		boolean addStatus = true;
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EUser> users_list = entityManager.createQuery(getUser, EUser.class).setParameter("login", login)
					.getResultList();
			List<EProduct> products_list = entityManager.createQuery(getProduct, EProduct.class)
					.setParameter("id", product.getId()).getResultList();
			EProduct eProduct = products_list.get(0);
			EUser eUser = users_list.get(0);
			ECart eCart = new ECart();
			eCart.setProduct(eProduct);
			eCart.setUser(eUser);
			entityManager.persist(eCart);
			userTransaction.commit();
		} catch (Exception e) {
			addStatus = false;
			Logger.getLogger(RepositoryCart.class.getName()).log(Level.INFO, null, e);
		}
		return addStatus;
	}

	@Override
	public void delete(Integer productID) {
		String query = "delete from ECart c where c.product.id=:id";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			entityManager.createQuery(query).setParameter("id", productID).executeUpdate();
			userTransaction.commit();
			entityManager.close();
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
	}

}
