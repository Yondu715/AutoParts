package core.infrastructure.builder.ProductsServiceBuilder;

import core.application.repositories.products.api.IProductsRepository;
import core.application.services.products.api.IProductsService;
import core.infrastructure.builder.Build;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class ProductsServiceBuilder {
    
    @Inject
    @Default
    private IProductsService productsService;

    @Inject
    @Default
    private IProductsRepository productsRepository;

    @Produces
    @Build
    public IProductsService buildProductsService() {
        productsService.setRepository(productsRepository);
        return productsService;
    }
}
