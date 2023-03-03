import { createContext } from "react";

export const FuncContext = createContext(null);

export function WithParentFunc({ children, func }) {
    return (
        <FuncContext.Provider value={func}>
            {children}
        </FuncContext.Provider>
    );
}