package core.application.service.products.impl;

import java.util.List;

import core.application.dto.Product;
import core.application.repository.products.api.IProductsRepository;
import core.application.service.products.api.IProductsService;

public class ProductsService implements IProductsService {

	private IProductsRepository productsRepository;

	@Override
	public void setRepository(IProductsRepository productsRepository) {
		this.productsRepository = productsRepository;
	}

	@Override
	public void addProduct(Product product) {
		productsRepository.add(product);
	}

	@Override
	public void deleteProduct(List<Integer> productsId) {
		for (Integer id : productsId) {
			productsRepository.delete(id);
		}
	}

	@Override
	public List<Product> getProducts() {
		return	productsRepository.findAll();
	}

	@Override
	public Product getProductById(Integer productId){
		return productsRepository.findById(productId);
	}


	@Override
	public List<Product> getProductsByUser(Integer userId) {
		return productsRepository.findByUser(userId);
	}

}
