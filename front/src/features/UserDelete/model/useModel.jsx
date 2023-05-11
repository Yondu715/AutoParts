import { userModel } from "entities/user";

export function useModel() {
    const selectedUsers = userModel.useSelectedUsers();
    const { deleteUsersAsync } = userModel.useModel();

    const asyncSendDeleteInfo = async () => {
        deleteUsersAsync(selectedUsers);
    }

    return { asyncSendDeleteInfo };
}