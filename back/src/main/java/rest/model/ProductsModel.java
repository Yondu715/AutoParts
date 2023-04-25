package rest.model;

import java.util.List;

import rest.model.dto.Product;
import rest.model.interfaces.in.IProductsModel;
import rest.model.interfaces.out.IProductsRepository;

public class ProductsModel implements IProductsModel {

	private IProductsRepository repProducts;

	@Override
	public void addProduct(Product product) {
		repProducts.add(product);
	}

	@Override
	public void deleteProduct(List<Product> productsId) {
		for (Product product : productsId) {
			repProducts.delete(product.getId());
		}
	}

	@Override
	public List<Product> getProducts(String seller_name) {
		List<Product> products = null;
		if (seller_name == null) {
			products = repProducts.findAll();
		} else {
			products = repProducts.findByUser(seller_name);
		}
		return products;
	}

	@Override
	public Product getProductInfo(Integer productId){
		return repProducts.findById(productId);
	}

	@Override
	public void setRepository(IProductsRepository repProducts) {
		this.repProducts = repProducts;
	}
}
