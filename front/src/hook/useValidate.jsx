import { useContext } from "react";
import { ValidContext } from "../hoc/WithAuthProvider";

export function useValidate() {
    return useContext(ValidContext);
}