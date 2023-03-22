import { useSelector } from "react-redux";

export function useUserInfo() {
    const user = useSelector(state => state.user.user);
    return user;
}