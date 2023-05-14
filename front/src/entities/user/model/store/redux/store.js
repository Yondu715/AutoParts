import { createSlice } from "@reduxjs/toolkit";
import { mapApplicationList, mapUserList } from "entities/user/lib";
import { requestAPI } from "shared/api";

const initialState = {
    users: [],
    selectedUsers: [],
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        ...initialState
    },
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        addToSelectedUsers(state, action) {
            if (!state.selectedUsers.includes(action.payload)) {
                state.selectedUsers = [...state.selectedUsers, action.payload];
            } else {
                state.selectedUsers = state.selectedUsers.filter(id => id !== action.payload);
            }
        },
        changeRole(state, action) {
            const userId = action.payload.id;
            const newRole = action.payload.role;
            state.users = state.users.map(user => user.id === userId ? { ...user, role: newRole } : user);
        },
        clearSelectedUsers(state) {
            state.selectedUsers = [];
        }
    }
});

export const selectUserFx = (id) => (dispatch) => {
    dispatch(userSlice.actions.addToSelectedUsers(id));
}

export const getUsersAsyncFx = () => async (dispatch) => {
    const response = await requestAPI.asyncGetAllUsers();
    let users = response.getBody();
    users = mapUserList(users);
    dispatch(userSlice.actions.setUsers(users));
}

export const deleteUsersAsyncFx = (usersId) => async (dispatch) => {
    await requestAPI.asyncDeleteUsers(usersId);
    dispatch(userSlice.actions.clearSelectedUsers());
    dispatch(getUsersAsyncFx());
}

export const getApplicationsAsyncFx = () => async (dispatch) => {
    const response = await requestAPI.asyncGetAllApplications();
    let applications = response.getBody();
    applications = mapApplicationList(applications);
    dispatch(userSlice.actions.setUsers(applications));
}

export const changeRoleHandlerFx = (id, role) => async (dispatch) => {
    const userInfo = { id, role };
    dispatch(userSlice.actions.changeRole(userInfo));
}

export const acceptApplicationsAsyncFx = (applications) => async (dispatch) => {
    await requestAPI.asyncAcceptApplications(applications);
    dispatch(userSlice.actions.clearSelectedUsers());
    dispatch(getApplicationsAsyncFx());
}

export const deleteApplicationsAsyncFx = (applicationsId) => async (dispatch) => {
    await requestAPI.asyncDeleteApplications(applicationsId);
    dispatch(userSlice.actions.clearSelectedUsers());
    dispatch(getApplicationsAsyncFx());
}

export const userReducer = userSlice.reducer;