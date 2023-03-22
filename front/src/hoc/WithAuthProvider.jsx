import { createContext, useState } from "react";

export const ValidContext = createContext(null);

export const WithAuthProvider = ({ children }) => {

    const initialState = {
        isAuth: false,
        login: undefined,
        password: undefined
    }
    
    const [user, setUser] = useState(initialState);

    const signIn = (isAuth, login, role) => {
        const userInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
        }
        setUser(userInfo);
    }

    const signOut = () => setUser(initialState);
    
    const validateValue = { user, signIn, signOut };

    return (
        <ValidContext.Provider value={validateValue}>
            {children}
        </ValidContext.Provider>
    );

}