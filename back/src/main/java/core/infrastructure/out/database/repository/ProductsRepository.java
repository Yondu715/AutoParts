package core.infrastructure.out.database.repository;

import java.util.List;

import core.application.dto.Product;
import core.application.repository.products.api.IProductsRepository;
import core.infrastructure.out.database.entity.EProduct;
import core.infrastructure.out.database.entity.EUser;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.persistence.TypedQuery;
import utils.mapper.productStruct;

@Stateless
public class ProductsRepository implements IProductsRepository {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Override
	public List<Product> findAll() {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EProduct> query = entityManager.createQuery("select p from EProduct p", EProduct.class);
		List<EProduct> productsList = query.getResultList();
		List<Product> products = productStruct.toProductList(productsList);
		entityManager.close();
		return products;
	}

	@Override
	public Product findById(Integer productId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EProduct> query = entityManager.createQuery("select p from EProduct p where p.id=:id",
				EProduct.class);
		query.setParameter("id", productId);
		Product product = null;
		EProduct eProduct = query.getSingleResult();
		product = productStruct.toProduct(eProduct);
		entityManager.close();
		return product;
	}

	@Override
	public List<Product> findByUser(String sellerName) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EProduct> query = entityManager
				.createQuery("select p from EProduct p join fetch p.user u where u.login=:seller_name", EProduct.class);
		query.setParameter("seller_name", sellerName);
		List<EProduct> productsList = query.getResultList();
		List<Product> products = productStruct.toProductList(productsList);
		entityManager.close();
		return products;
	}

	@Override
	public void add(Product product) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> query = entityManager.createQuery("select u from EUser u where u.login=:seller_name",
				EUser.class);
		query.setParameter("seller_name", product.getSellerName());
		try {
			entityManager.joinTransaction();
			EUser eUser = query.getSingleResult();
			EProduct eProduct = productStruct.toEProduct(product, eUser);
			entityManager.persist(eProduct);
		} catch (Exception e) {
		} finally {
			entityManager.close();
		}
	}

	@Override
	public void delete(Integer productId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EProduct> query = entityManager.createQuery("delete from EProduct p where p.id=:id", EProduct.class);
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
