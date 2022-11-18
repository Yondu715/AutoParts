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

import rest.db.entities.EProduct;
import rest.db.entities.EUser;
import rest.db.interfaces.IRepositoryProducts;
import rest.model.dataObject.Product;

public class RepositoryProducts implements IRepositoryProducts {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	@Resource
	UserTransaction userTransaction;

	@Override
	public ArrayList<Product> getAll() {
		ArrayList<Product> products = new ArrayList<>();
		Integer size = -1;
		EntityManager entityManager;
		String query = "select p from EProduct p";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EProduct> products_list = entityManager.createQuery(query, EProduct.class).getResultList();
			userTransaction.commit();
			size = products_list.size();
			if (size <= 0) {
				return products;
			}
			for (int i = 0; i < size; i++) {
				Product product = new Product();
				EProduct eProduct = products_list.get(i);
				product.setId(eProduct.getId());
				product.setName(eProduct.getName());
				product.setSellerName(eProduct.getUser().getLogin());
				product.setModel(eProduct.getModel());
				product.setBrand(eProduct.getBrand());
				product.setPrice(eProduct.getPrice());
				product.setDate(eProduct.getDate().toString());
				product.setImage(eProduct.getImage());
				products.add(product);
			}
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
		return products;
	}

	@Override
	public Product getById(Integer product_id) {
		EntityManager entityManager;
		String query = "select p from EProduct p where p.id=" + product_id;
		Product product = new Product();
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EProduct> products_list = entityManager.createQuery(query, EProduct.class).getResultList();
			userTransaction.commit();
			if (products_list.size() != 1) {
				return product;
			}
			EProduct eProduct = products_list.get(0);
			product.setId(eProduct.getId());
			product.setName(eProduct.getName());
			product.setSellerName("test");
			product.setBrand(eProduct.getBrand());
			product.setDate(eProduct.getDate().toString());
			product.setImage(eProduct.getImage());
			product.setModel(eProduct.getModel());
			product.setPrice(eProduct.getPrice());
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
		return product;
	}

	@Override
	public ArrayList<Product> getByUser(String seller_name) {
		ArrayList<Product> products = new ArrayList<>();
		Integer size = -1;
		EntityManager entityManager;
		String query = "select p from EProduct p";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EProduct> products_list = entityManager.createQuery(query, EProduct.class).getResultList();
			userTransaction.commit();
			size = products_list.size();
			if (size <= 0){
				return products;
			}
			for (int i = 0; i < size; i++) {
				Product product = new Product();
				EProduct eProduct = products_list.get(i);
				if (!eProduct.getUser().getLogin().equals(seller_name)) {
					continue;
				}
				product.setId(eProduct.getId());
				product.setName(eProduct.getName());
				product.setSellerName(eProduct.getUser().getLogin());
				product.setModel(eProduct.getModel());
				product.setBrand(eProduct.getBrand());
				product.setPrice(eProduct.getPrice());
				product.setDate(eProduct.getDate().toString());
				product.setImage(eProduct.getImage());
				products.add(product);
			}
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
		return products;
	}

	@Override
	public void add(Product product) {
		EntityManager entityManager;
		String query = "select u from EUser u where u.login='" + product.getSellerName() + "'";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EUser> users_list = entityManager.createQuery(query, EUser.class).getResultList();
			EProduct eProduct = new EProduct();
			eProduct.setName(product.getName());
			eProduct.setUser(users_list.get(0));
			eProduct.setModel(product.getModel());
			eProduct.setBrand(product.getBrand());
			eProduct.setPrice(product.getPrice());
			eProduct.setImage(product.getImage());
			entityManager.persist(eProduct);
			userTransaction.commit();
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
	}

	@Override
	public void delete(Integer product_id) {
		EntityManager entityManager;
		String query = "delete from EProduct p where p.id=" + product_id;
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			entityManager.createQuery(query).executeUpdate();
			userTransaction.commit();
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
	}
}
