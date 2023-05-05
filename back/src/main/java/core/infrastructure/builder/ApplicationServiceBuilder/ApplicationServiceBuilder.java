package core.infrastructure.builder.ApplicationServiceBuilder;

import core.application.repository.users.api.IUsersRepository;
import core.application.service.application.api.IApplicationService;
import core.infrastructure.builder.Build;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class ApplicationServiceBuilder {
    @Inject
    @Default
    private IApplicationService applicationService;

    @Inject
    @Default
    private IUsersRepository usersRepository;

    @Produces
    @Build
    public IApplicationService buildAdminService() {
        applicationService.setRepository(usersRepository);
        return applicationService;
    }


}
