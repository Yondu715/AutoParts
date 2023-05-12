package core.infrastructure.builder.UserService;

import core.application.in.service.user.api.IUserService;
import core.application.out.repository.users.api.IUsersRepository;
import core.infrastructure.builder.Build;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class UserServiceBuilder {
    
    @Inject
    @Default
    private IUserService userService;

    @Inject
    @Default
    private IUsersRepository usersRepository;

    @Produces
    @Build
    public IUserService buildUserService() {
        userService.setRepository(usersRepository);
        return userService;
    }
}
