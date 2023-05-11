import { useMountEffect } from "shared/lib/hooks";
import { userModel } from "entities/user";

export function useList() {
    const applications = userModel.useUsers();
    const { getApplicationsAsync, changeRoleHandler, selectUser } = userModel.useModel();
    const selectedApplications = userModel.useSelectedUsers();
    const roles = ["client", "admin"];

    const selectApplication = (id) => {
        selectUser(id);
    }

    const _asyncGetApplications = async () => {
        getApplicationsAsync();
    }

    useMountEffect(_asyncGetApplications);

    return {
        applications, selectedApplications, selectApplication,
        changeRoleHandler, roles
    }
}