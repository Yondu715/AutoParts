package rest.db.repos;

import java.text.SimpleDateFormat;
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
import rest.model.dto.Product;
import rest.model.interfaces.out.IRepositoryProducts;

public class RepositoryProducts implements IRepositoryProducts {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Resource
	UserTransaction userTransaction;

	@Override
	public ArrayList<Product> findAll() {
		ArrayList<Product> products = new ArrayList<>();
		String query = "select p from EProduct p";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EProduct> products_list = entityManager.createQuery(query, EProduct.class).getResultList();
			userTransaction.commit();
			entityManager.close();
			for (EProduct eProduct : products_list) {
				Product product = new Product();
				product.setId(eProduct.getId());
				product.setName(eProduct.getName());
				product.setSellerName(eProduct.getUser().getLogin());
				product.setModel(eProduct.getModel());
				product.setBrand(eProduct.getBrand());
				product.setPrice(eProduct.getPrice());
				product.setDate(new SimpleDateFormat("dd.MM.YYYY").format(eProduct.getDate()));
				product.setImage(eProduct.getImage());
				products.add(product);
			}
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
		return products;
	}

	@Override
	public Product findById(Integer product_id) {
		String query = "select p from EProduct p where p.id=:id";
		Product product = new Product();
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			EProduct eProduct = entityManager.createQuery(query, EProduct.class).setParameter("id", product_id)
					.getResultList().get(0);
			userTransaction.commit();
			entityManager.close();
			product.setId(eProduct.getId());
			product.setName(eProduct.getName());
			product.setSellerName(eProduct.getUser().getLogin());
			product.setBrand(eProduct.getBrand());
			product.setDate(new SimpleDateFormat("dd.MM.YYYY").format(eProduct.getDate()));
			product.setImage(eProduct.getImage());
			product.setModel(eProduct.getModel());
			product.setPrice(eProduct.getPrice());
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
		return product;
	}

	@Override
	public ArrayList<Product> findByUser(String seller_name) {
		ArrayList<Product> products = new ArrayList<>();
		String query = "select p from EProduct p where p.user.login=:seller";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EProduct> products_list = entityManager.createQuery(query, EProduct.class).setParameter("seller", seller_name).getResultList();
			userTransaction.commit();
			entityManager.close();
			for (EProduct eProduct : products_list) {
				Product product = new Product();
				product.setId(eProduct.getId());
				product.setName(eProduct.getName());
				product.setSellerName(eProduct.getUser().getLogin());
				product.setModel(eProduct.getModel());
				product.setBrand(eProduct.getBrand());
				product.setPrice(eProduct.getPrice());
				product.setDate(new SimpleDateFormat("dd.MM.YYYY").format(eProduct.getDate()));
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
		String query = "select u from EUser u where u.login=:seller_name";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EUser> users_list = entityManager.createQuery(query, EUser.class)
					.setParameter("seller_name", product.getSellerName()).getResultList();
			EProduct eProduct = new EProduct();
			eProduct.setName(product.getName());
			eProduct.setUser(users_list.get(0));
			eProduct.setModel(product.getModel());
			eProduct.setBrand(product.getBrand());
			eProduct.setPrice(product.getPrice());
			eProduct.setImage(product.getImage());
			entityManager.persist(eProduct);
			userTransaction.commit();
			entityManager.close();
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
	}

	@Override
	public void delete(Integer product_id) {
		String query = "delete from EProduct p where p.id=:id";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			entityManager.createQuery(query).setParameter("id", product_id).executeUpdate();
			userTransaction.commit();
			entityManager.close();
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
	}
}
