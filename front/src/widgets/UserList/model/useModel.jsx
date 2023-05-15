import { userModel } from "entities/user";
import { useMountEffect } from "shared/lib/hooks";

export function useModel() {

    const users = userModel.useUsers();
    const selectedUsers = userModel.useSelectedUsers();
    const { selectUser, getUsersAsync } = userModel.useModel();

    const usersHandler = (id) => {
        selectUser(id);
    }

    const _asyncGetUsers = () => {
        getUsersAsync();
    }

    useMountEffect(_asyncGetUsers);

    return {
        users, selectedUsers, usersHandler
    }
}