package utils;

import java.util.ArrayList;
import java.util.List;

import core.application.dto.Cart;
import core.infrastructure.out.database.entity.ECart;

public class cartStruct {
    public static List<Cart> toCart(List<ECart> cartList) {
        List<Cart> carts = new ArrayList<>();
        for (ECart eCart : cartList) {
            Cart cart = new Cart();
            cart.setId(eCart.getId());
            cart.setUsername(eCart.getUser().getLogin());
            cart.setProduct(productStruct.toProduct(eCart.getProduct()));
            carts.add(cart);
        }
        return carts;
    }
}
