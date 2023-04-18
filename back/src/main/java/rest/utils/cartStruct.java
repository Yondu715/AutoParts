package rest.utils;

import java.util.ArrayList;
import java.util.List;

import rest.db.entities.ECart;
import rest.model.dto.Product;

public class cartStruct {
    public static List<Product> toProduct(List<ECart> cartList){
        List<Product> products = new ArrayList<>();
        for (ECart eCart : cartList) {
            Product product = productStruct.toProduct(eCart.getProduct());
            products.add(product);
        }
        return products;
    }
}
