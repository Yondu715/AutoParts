package rest.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import rest.db.entities.EProduct;
import rest.db.entities.EUser;
import rest.model.dto.Product;
import rest.model.dto.User;

public class mapStruct {

    public static ArrayList<Product> toProduct(List<EProduct> eProducts) {
        ArrayList<Product> products = new ArrayList<>();
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

    public static ArrayList<User> toUser(List<EUser> eUsers) {
        ArrayList<User> users = new ArrayList<>();
        for (EUser eUser : eUsers) {
            User user = toUser(eUser);
            users.add(user);
        }
        return users;
    }

    public static User toUser(EUser eUser) {
        User user = new User();
        user.setId(eUser.getId());
        user.setLogin(eUser.getLogin());
        user.setPassword(eUser.getPassword());
        user.setRole(eUser.getRole());
        return user;
    }

    public static EUser toEUser(User user){
        EUser eUser = new EUser();
        eUser.setLogin(user.getLogin());
        eUser.setPassword(user.getPassword());
        eUser.setRole(user.getRole());
        return eUser;
    }

    

}
