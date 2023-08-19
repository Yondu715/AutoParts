import { Router } from "../router";
import { withAuthGuard } from "./with-auth-guard";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";

const compose = (...functions) => {
    return (initialValue) => functions.reduceRight((result, func) => func(result), initialValue);
}

const withProviders = compose(withStore, withAuthGuard, withRouter);

export const Provider = withProviders(() => {
    return (
        <Router />
    );
})

