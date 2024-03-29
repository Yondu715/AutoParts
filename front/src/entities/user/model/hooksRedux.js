import { useDispatch, useSelector } from "react-redux";
import {
    acceptApplicationsAsyncFx, changeRoleHandlerFx, deleteApplicationsAsyncFx,
    deleteUsersAsyncFx, getApplicationsAsyncFx, getUsersAsyncFx,
    selectUserFx
} from "./store";

export function useModel() {
    const dispatch = useDispatch();

    const getApplicationsAsync = async () => {
        dispatch(getApplicationsAsyncFx());
    }

    const changeRoleHandler = (id, role) => {
        dispatch(changeRoleHandlerFx(id, role));
    }

    const selectUser = (id) => {
        dispatch(selectUserFx(id));
    }

    const acceptApplicationsAsync = async (applications) => {
        dispatch(acceptApplicationsAsyncFx(applications));
    }

    const deleteApplicationsAsync = async (applicationsId) => {
        dispatch(deleteApplicationsAsyncFx(applicationsId));
    }

    const getUsersAsync = async () => {
        dispatch(getUsersAsyncFx());
    }

    const deleteUsersAsync = async (usersId) => {
        dispatch(deleteUsersAsyncFx(usersId));
    }

    return {
        getApplicationsAsync, changeRoleHandler, selectUser,
        acceptApplicationsAsync, deleteApplicationsAsync, getUsersAsync,
        deleteUsersAsync
    };
}

export function useUsers() {
    return useSelector(state => state.user.users);
}

export function useSelectedUsers() {
    return useSelector(state => state.user.selectedUsers);
}
