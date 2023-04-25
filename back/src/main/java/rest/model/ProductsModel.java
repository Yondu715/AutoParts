package rest.model;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.in.IProductsModel;
import rest.model.interfaces.out.IProductsRepository;

public class ProductsModel implements IProductsModel {

	private IProductsRepository productsRepository;

	@Override
	public void addProduct(Product product) {
		productsRepository.add(product);
	}

	@Override
	public void deleteProduct(List<Product> productsId) {
		for (Product product : productsId) {
			productsRepository.delete(product.getId());
		}
	}

	@Override
	public List<Product> getProducts(String seller_name) {
		List<Product> products = null;
		if (seller_name == null) {
			products = productsRepository.findAll();
		} else {
			products = productsRepository.findByUser(seller_name);
		}
		return products;
	}

	@Override
	public Product getProductInfo(Integer productId){
		return productsRepository.findById(productId);
	}

	@Override
	public void setRepository(IProductsRepository productsRepository) {
		this.productsRepository = productsRepository;
	}
}
