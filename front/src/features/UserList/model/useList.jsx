import { useState } from "react";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { User } from "shared/lib/transport";
import { viewerModel } from "entities/viewer";

export function useList() {

    const { signOut } = viewerModel.useValidate();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const usersHandler = (id) =>
        setSelectedUsers((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });

    const _asyncGetUsers = () => {
        requestAPI.sendRequest(requestAPI.asyncGetAllUsers, _callbackGetUsers);
    }

    const _callbackGetUsers = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 200:
                const users = dataAction.jsonToObjects(data, User);
                setUsers(users);
                break;
            default:
                break;
        }
    }

    const asyncSendDeleteInfo = async () => {
        const jsonUsersId = [];
        selectedUsers.forEach(id => {
            jsonUsersId.push({ id: id });
        });
        requestAPI.sendRequest(() => requestAPI.asyncDeleteUsers(jsonUsersId), _callbackDeleteInfo);
    }

    const _callbackDeleteInfo = (status) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 204:
                setSelectedUsers([]);
                _asyncGetUsers();
                break;
            default:
                break;
        }
    }

    useMountEffect(_asyncGetUsers);

    return {
        users, selectedUsers,
        asyncSendDeleteInfo, usersHandler
    }
}