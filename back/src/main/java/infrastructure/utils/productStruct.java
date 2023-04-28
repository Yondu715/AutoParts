package infrastructure.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import application.dto.Product;
import infrastructure.database.entities.EProduct;
import infrastructure.database.entities.EUser;

public class productStruct {

    public static List<Product> toProductList(List<EProduct> eProducts) {
        List<Product> products = new ArrayList<>();
        for (EProduct eProduct : eProducts) {
            Product product = toProduct(eProduct);
            products.add(product);
        }
        return products;
    }

    public static Product toProduct(EProduct eProduct) {
        Product product = new Product();
        product.setId(eProduct.getId());
        product.setName(eProduct.getName());
        product.setSellerName(eProduct.getUser().getLogin());
        product.setModel(eProduct.getModel());
        product.setBrand(eProduct.getBrand());
        product.setPrice(eProduct.getPrice());
        product.setDate(new SimpleDateFormat("dd.MM.YYYY").format(eProduct.getDate()));
        product.setImage(eProduct.getImage());
        return product;
    }

    public static EProduct toEProduct(Product product, EUser eUser){
        EProduct eProduct = new EProduct();
        eProduct.setName(product.getName());
        eProduct.setUser(eUser);
        eProduct.setModel(product.getModel());
        eProduct.setBrand(product.getBrand());
        eProduct.setPrice(product.getPrice());
        eProduct.setImage(product.getImage());
        return eProduct;
    }
}