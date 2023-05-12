package core.infrastructure.builder.TokenService;

import core.application.in.service.token.api.ITokenService;
import core.application.out.interconnect.Interconnectorable;
import core.infrastructure.builder.Build;
import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;

public class TokenServiceBuilder {

    @Inject
    @Default
    private ITokenService tokenService;

    @Inject
    @Default
    private Interconnectorable interconnector;

    @Produces
    @Build
    public ITokenService buildTokenService() {
        tokenService.setInterconnector(interconnector);
        return tokenService;
    }

}
