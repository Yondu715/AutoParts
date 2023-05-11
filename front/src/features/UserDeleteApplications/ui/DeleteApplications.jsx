import { SubmitButton } from "shared/ui/SubmitButton";
import { useModel } from "../model/useModel";

export function DeleteApplications() {

    const { asyncDeleteApp } = useModel();

    return (
        <SubmitButton type="delete" onClick={asyncDeleteApp}>Удалить</SubmitButton>
    );
}