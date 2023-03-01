import { useContext } from "react";
import { AuthContext } from "../hoc/WithAuthProvider";

export function useValidate() {
    return useContext(AuthContext);
}