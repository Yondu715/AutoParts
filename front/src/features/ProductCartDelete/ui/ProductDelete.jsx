import { SubmitButton } from "shared/ui/SubmitButton";
import { useModel } from "../model";

export function ProductDelete() {

    const { asyncSendDeleteInfo } = useModel();

    return (
        <SubmitButton type="delete" onClick={asyncSendDeleteInfo}>Удалить</SubmitButton>
    )
}