package core.infrastructure.out.database.repository;

import java.util.List;

import core.application.dto.Product;
import core.application.out.repository.products.api.IProductsRepository;
import core.infrastructure.out.database.entity.EProduct;
import core.infrastructure.out.database.entity.EUser;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import utils.mapper.productStruct;

@Stateless
public class ProductsRepository implements IProductsRepository {

	@PersistenceContext(unitName = "autoparts_PersistenceUnit")
	private EntityManager entityManager;

	@Override
	public List<Product> findAll() {
		TypedQuery<EProduct> query = entityManager.createQuery("select p from EProduct p", EProduct.class);
		List<EProduct> productsList = query.getResultList();
		List<Product> products = productStruct.toProductList(productsList);
		return products;
	}

	@Override
	public Product findById(Integer productId) {
		TypedQuery<EProduct> query = entityManager.createQuery("select p from EProduct p where p.id=:id",
				EProduct.class);
		query.setParameter("id", productId);
		EProduct eProduct = query.getSingleResult();
		Product product = productStruct.toProduct(eProduct);
		return product;
	}

	@Override
	public void add(Product product) {
		TypedQuery<EUser> query = entityManager.createQuery("select u from EUser u where u.login=:seller_name",
				EUser.class);
		query.setParameter("seller_name", product.getSellerName());
		EUser eUser = query.getSingleResult();
		EProduct eProduct = productStruct.toEProduct(product, eUser);
		entityManager.persist(eProduct);

	}

	@Override
	public void delete(Integer productId) {
		TypedQuery<EProduct> query = entityManager.createQuery("delete from EProduct p where p.id=:id", EProduct.class);
		query.setParameter("id", productId);
		query.executeUpdate();
	}

	@Override
	public List<Product> findByUser(Integer userId) {
		TypedQuery<EProduct> query = entityManager
				.createQuery("select p from EProduct p join fetch p.user u where u.id=:id", EProduct.class);
		query.setParameter("id", userId);
		List<EProduct> productsList = query.getResultList();
		List<Product> products = productStruct.toProductList(productsList);
		return products;
	}
}
