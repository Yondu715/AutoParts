package core.infrastructure.builder.CartService;

import core.application.in.service.cart.api.ICartService;
import core.application.out.repository.cart.api.ICartsRepository;
import core.infrastructure.builder.Build;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class CartServiceBuilder {
    @Inject @Default
    ICartService cartService;

    @Inject @Default
    ICartsRepository cartsRepository;

    @Produces @Build
    public ICartService buildCartService(){
        cartService.setRepository(cartsRepository);
        return cartService;
    }
}
