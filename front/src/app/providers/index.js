import { withAuthGuard } from "./with-auth-guard";
import { withRouter } from "./with-router";
import { withReduxStore } from "./with-store";

const compose = (...functions) => {
    return (initialValue) => functions.reduceRight((result, func) => func(result), initialValue);
}

export const withProviders = compose(withReduxStore, withAuthGuard, withRouter);

