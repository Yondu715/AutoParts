package infrastructure.builder;

import application.interfaces.in.IApplicationService;
import application.interfaces.in.ICartService;
import application.interfaces.in.IProductsService;
import application.interfaces.in.IUserService;
import application.interfaces.out.ICartsRepository;
import application.interfaces.out.IProductsRepository;
import application.interfaces.out.IUsersRepository;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class Builder {
	@Inject @Default
	private IApplicationService applicationService;

	@Inject @Default
	private ICartService cartService;

	@Inject @Default
	private IProductsService productsService;

	@Inject @Default
	private IUserService userService;

	@Inject @Default
	private ICartsRepository cartsRepository;

	@Inject @Default
	private IProductsRepository productsRepository;

	@Inject @Default
	private IUsersRepository usersRepository;

	@Produces @Build
	public ICartService buildCartService(){
		cartService.setRepository(cartsRepository);
		return cartService;
	}

	@Produces @Build
	public IProductsService buildProductsService() {
		productsService.setRepository(productsRepository);
		return productsService;
	}

	@Produces @Build
	public IUserService buildUserService() {
		userService.setRepository(usersRepository);
		return userService;
	}

	@Produces @Build
	public IApplicationService buildAdminService(){
		applicationService.setRepository(usersRepository);
		return applicationService;
	}
}
