package infrastructure.utils;

import java.util.ArrayList;
import java.util.List;

import application.dto.User;
import infrastructure.database.entities.EUser;

public class userStruct {
    public static List<User> toUser(List<EUser> eUsers) {
        List<User> users = new ArrayList<>();
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

    public static EUser toEUser(User user) {
        EUser eUser = new EUser();
        eUser.setLogin(user.getLogin());
        eUser.setPassword(user.getPassword());
        eUser.setRole(user.getRole());
        return eUser;
    }
}