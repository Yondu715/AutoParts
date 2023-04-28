package infrastructure.builder;

import application.interfaces.in.IApplicationModel;
import application.interfaces.in.ICartModel;
import application.interfaces.in.IProductsModel;
import application.interfaces.in.IUserModel;
import application.interfaces.out.ICartsRepository;
import application.interfaces.out.IProductsRepository;
import application.interfaces.out.IUsersRepository;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

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
