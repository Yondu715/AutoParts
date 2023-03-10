import { createContext, useState } from "react";

export const ValidContext = createContext(null);

export const WithAuthProvider = ({ children }) => {

    const initialForm = {
        isAuth: false,
        login: undefined,
        password: undefined
    }
    const [user, setUser] = useState(initialForm);

    const signIn = (isAuth, login, role) => {
        const userInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
        }
        setUser(userInfo);
    }

    const signOut = () => setUser(initialForm);
    
    const validateValue = { user, signIn, signOut };

    return (
        <ValidContext.Provider value={validateValue}>
            {children}
        </ValidContext.Provider>
    );

}