import { useContext } from "react";
import { FuncContext } from "../hoc/WithParentFunc";

export function useParentFunc(){
    return useContext(FuncContext);
}