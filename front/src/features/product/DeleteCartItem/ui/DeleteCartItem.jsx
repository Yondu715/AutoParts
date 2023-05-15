import { useModel } from "../model";
import { SubmitButton } from "shared/ui/SubmitButton";

export function DeleteCartItem() {

    const { asyncSendDeleteInfo } = useModel();

    return (
        <SubmitButton type="delete" onClick={asyncSendDeleteInfo}>Удалить</SubmitButton>
    )
}