import { SubmitButton } from "shared/ui/SubmitButton";
import { useModel } from "../model/useModel";

export function ProductDelete({ userId }) {

    const { asyncSendDeleteInfo } = useModel(userId);

    return (
        <SubmitButton type="delete" onClick={asyncSendDeleteInfo}>Удалить</SubmitButton>
    )
}