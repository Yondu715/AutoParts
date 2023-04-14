import { requestAPI } from "../../../shared/api";
import { LS_TOKEN } from "../../../shared/config";

let userInfo = {
    isAuth: false,
    login: null,
    role: null,
}

export const checkAuth = async () => {
    await requestAPI.sendRequest(requestAPI.asyncAuth, _callbackCheckAuth);
    return userInfo;
};

function _callbackCheckAuth(status) {
    switch (status) {
        case 204:
            const tokenBody = localStorage.getItem(LS_TOKEN).split(".")[1];
            const decodedBody = atob(tokenBody);
            const payload = JSON.parse(decodedBody);
            const login = payload["login"];
            const role = payload["role"];
            userInfo = {
                isAuth: true,
                login: login,
                role: role,
            }
            break;

        case 401:
        default:
            break;
    }
}