package rest.builder;

import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;
import rest.model.interfaces.in.IModelApplications;
import rest.model.interfaces.in.IModelCart;
import rest.model.interfaces.in.IModelProducts;
import rest.model.interfaces.in.IModelUser;
import rest.model.interfaces.out.IRepositoryCart;
import rest.model.interfaces.out.IRepositoryProducts;
import rest.model.interfaces.out.IRepositoryUsers;

public class Builder {
	@Inject @Default
	private IModelApplications modelApplications;

	@Inject @Default
	private IModelCart modelCart;

	@Inject @Default
	private IModelProducts modelProducts;

	@Inject @Default
	private IModelUser modelUser;

	@Inject @Default
	private IRepositoryCart repCart;

	@Inject @Default
	private IRepositoryProducts repProducts;

	@Inject @Default
	private IRepositoryUsers repUsers;

	@Produces @Build
	public IModelCart buildModelCart(){
		modelCart.setRepository(repCart);
		return modelCart;
	}

	@Produces @Build
	public IModelProducts buildModelProducts() {
		modelProducts.setRepository(repProducts);
		return modelProducts;
	}

	@Produces @Build
	public IModelUser buildModelUser() {
		modelUser.setRepository(repUsers);
		return modelUser;
	}

	@Produces @Build
	public IModelApplications buildModelAdmin(){
		modelApplications.setRepository(repUsers);
		return modelApplications;
	}
}
