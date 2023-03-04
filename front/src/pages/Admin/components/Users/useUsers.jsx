import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { asyncDeleteUsers, asyncGetAllUsers } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { User } from "../../../../core/model/transport/User";

export function useUsers() {

    const { signOut } = useValidate();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const _selectUser = (id) =>
        setSelectedUsers((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });

    const _asyncGetUsers = async () => {
        const response = await asyncGetAllUsers();
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetUsers(status, data);
    }

    const _callbackGetUsers = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                navigate("/auth");
                break;
            case 200:
                const users = jsonToObjects(data, User);
                setUsers(users);
                break;
            default:
                break;
        }
    }

    const _asyncSendDeleteInfo = async () => {
        const jsonUsersId = [];
        selectedUsers.forEach(id => {
            jsonUsersId.push({ id: id });
        });
        const response = await asyncDeleteUsers(jsonUsersId);
        const status = response.getStatus();
        _callbackDeleteInfo(status);
    }

    const _callbackDeleteInfo = (status) => {
        switch (status) {
            case 401:
                signOut();
                navigate("/auth")
                break;
            case 204:
                setSelectedUsers([]);
                _asyncGetUsers();
                break;
            default:
                break;
        }
    }

    return {
        users, selectedUsers,
        _asyncGetUsers, _asyncSendDeleteInfo,
        _selectUser
    }
}