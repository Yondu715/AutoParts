package utils.mapper;

import java.util.ArrayList;
import java.util.List;

import core.application.dto.Cart;
import core.infrastructure.out.database.entity.ECartItem;

public class cartStruct {
    public static List<Cart> toCart(List<ECartItem> cartList) {
        List<Cart> carts = new ArrayList<>();
        for (ECartItem eCart : cartList) {
            Cart cart = new Cart();
            cart.setId(eCart.getId());
            cart.setUsername(eCart.getUser().getLogin());
            cart.setProduct(productStruct.toProduct(eCart.getProduct()));
            carts.add(cart);
        }
        return carts;
    }
}
