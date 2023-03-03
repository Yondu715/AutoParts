import { createContext, useState } from "react";

export const ValidContext = createContext(null);

export const WithAuthProvider = ({ children }) => {
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

    const value = { user, signIn, signOut };

    return <ValidContext.Provider value={value}>
        {children}
    </ValidContext.Provider>

}