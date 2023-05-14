import { userModel } from "entities/user";
import { useMountEffect } from "shared/lib/hooks";

export function useList() {
    const applications = userModel.useUsers();
    const { getApplicationsAsync, changeRoleHandler, selectUser } = userModel.useModel();
    const selectedApplications = userModel.useSelectedUsers();
    const roles = ["client", "admin"];

    const selectApplication = (id) => {
        selectUser(id);
    }

    const asyncGetApplications = async () => {
        getApplicationsAsync();
    }

    useMountEffect(asyncGetApplications);

    return {
        applications, selectedApplications, selectApplication,
        changeRoleHandler, roles
    }
}