import { useMountEffect } from "shared/lib/hooks";
import { userModel } from "entities/user";

export function useList() {

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