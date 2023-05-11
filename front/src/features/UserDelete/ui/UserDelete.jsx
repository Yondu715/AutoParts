import { SubmitButton } from "shared/ui/SubmitButton";
import { useModel } from "../model/useModel";

export function UserDelete() {

    const { asyncSendDeleteInfo } = useModel();

    return (
        <SubmitButton type="delete" onClick={asyncSendDeleteInfo}>Удалить</SubmitButton>
    );
}