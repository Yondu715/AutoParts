package application;

import java.util.List;

import application.dto.Product;
import application.interfaces.in.IProductsService;
import application.interfaces.out.IProductsRepository;

public class ProductsService implements IProductsService {

	private IProductsRepository productsRepository;

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
	public List<Product> getProductsBySeller(String sellerName) {
		return productsRepository.findByUser(sellerName);
	}

	@Override
	public Product getProduct(Integer productId){
		return productsRepository.findById(productId);
	}

	@Override
	public void setRepository(IProductsRepository productsRepository) {
		this.productsRepository = productsRepository;
	}

}
