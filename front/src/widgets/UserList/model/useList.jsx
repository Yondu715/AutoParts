import { useState } from "react";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { User } from "entities/user";

export function useList() {

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
            case 200:
                const users = dataAction.jsonToObjects(data, User);
                setUsers(users);
                break;
            default:
                break;
        }
    }

    const asyncSendDeleteInfo = async () => {
        requestAPI.sendRequest(() => requestAPI.asyncDeleteUsers(selectedUsers), _callbackDeleteInfo);
    }

    const _callbackDeleteInfo = (status) => {
        switch (status) {
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