package rest.builder;

import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;
import rest.model.interfaces.in.IApplicationModel;
import rest.model.interfaces.in.ICartModel;
import rest.model.interfaces.in.IProductsModel;
import rest.model.interfaces.in.IUserModel;
import rest.model.interfaces.out.ICartsRepository;
import rest.model.interfaces.out.IProductsRepository;
import rest.model.interfaces.out.IUsersRepository;

public class Builder {
	@Inject @Default
	private IApplicationModel modelApplications;

	@Inject @Default
	private ICartModel modelCart;

	@Inject @Default
	private IProductsModel modelProducts;

	@Inject @Default
	private IUserModel modelUser;

	@Inject @Default
	private ICartsRepository repCart;

	@Inject @Default
	private IProductsRepository repProducts;

	@Inject @Default
	private IUsersRepository repUsers;

	@Produces @Build
	public ICartModel buildModelCart(){
		modelCart.setRepository(repCart);
		return modelCart;
	}

	@Produces @Build
	public IProductsModel buildModelProducts() {
		modelProducts.setRepository(repProducts);
		return modelProducts;
	}

	@Produces @Build
	public IUserModel buildModelUser() {
		modelUser.setRepository(repUsers);
		return modelUser;
	}

	@Produces @Build
	public IApplicationModel buildModelAdmin(){
		modelApplications.setRepository(repUsers);
		return modelApplications;
	}
}
