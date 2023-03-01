import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const WithAuthProvider = ({children}) => {
    const [user, setUser] = useState({
        isAuth: false
    });

    const signIn = (isAuth, login, role) => {
        const userInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
        }
        setUser(userInfo);
    }

    const signOut = () => {
        const userInfo = {
            isAuth: false,
            login: undefined,
            role: undefined,
        }
        setUser(userInfo);
    }

    /*const checkAuth = (authFunc, callback, value) => {
        checkLogin(authFunc).then(
            data => {
                const { isAuth, login, role } = data;
                signIn(isAuth, login, role);
            }
        ).finally(() => callback(value));
    }

    const checkLogin = async (authFunc) => {
        let userInfo = {
            isAuth: false,
            login: null,
            role: null,
        }
        if (localStorage.getItem("token") === null) {
            return userInfo;
        }
        const response = await authFunc();
        const status = response.getStatus();

        switch (status) {
            case 401:
                return userInfo;
            case 200:
                const tokenBody = localStorage.getItem("token").split(".")[1];
                const decodedBody = atob(tokenBody);
                const payload = JSON.parse(decodedBody);
                const login = payload["login"];
                const role = payload["role"];
                userInfo = {
                    isAuth: true,
                    login: login,
                    role: role,
                }
                return userInfo;

            default:
                return userInfo;
        }
    };*/

    
    const value = {user, signIn, signOut};
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}