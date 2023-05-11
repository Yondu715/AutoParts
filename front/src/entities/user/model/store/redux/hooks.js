import { useDispatch, useSelector } from "react-redux";
import { acceptApplicationsAsyncFx, authUserAsyncFx, changeRoleHandlerFx, deleteApplicationsAsyncFx, deleteUsersAsyncFx, getApplicationsAsyncFx, getUsersAsyncFx, regUserAsyncFx, selectUserFx } from "./store";

export function useModel() {
    const dispatch = useDispatch();

    const getApplicationsAsync = () => {
        dispatch(getApplicationsAsyncFx());
    }

    const changeRoleHandler = (id, role) => {
        dispatch(changeRoleHandlerFx(id, role));
    }

    const selectUser = (id) => {
        dispatch(selectUserFx(id));
    }

    const acceptApplicationsAsync = (applications) => {
        dispatch(acceptApplicationsAsyncFx(applications));
    }

    const deleteApplicationsAsync = (applicationsId) => {
        dispatch(deleteApplicationsAsyncFx(applicationsId));
    }

    const getUsersAsync = () => {
        dispatch(getUsersAsyncFx());
    }

    const deleteUsersAsync = (usersId) => {
        dispatch(deleteUsersAsyncFx(usersId));
    }

    const authUserAsync = (user, callback) => {
        authUserAsyncFx(user, callback);
    }

    const regUserAsync = (user, callback) => {
        regUserAsyncFx(user, callback);
    }

    return { 
        getApplicationsAsync, changeRoleHandler, selectUser, 
        acceptApplicationsAsync, deleteApplicationsAsync, getUsersAsync,
        deleteUsersAsync, authUserAsync, regUserAsync
    };
}

export function useUsers() {
    return useSelector(state => state.user.users);
}

export function useSelectedUsers() {
    return useSelector(state => state.user.selectedUsers);
}
