import { useModel } from "../model";
import { SubmitButton } from "shared/ui/SubmitButton";

export function DeleteApplications() {

    const { asyncDeleteApp } = useModel();

    return (
        <SubmitButton type="delete" onClick={asyncDeleteApp}>Удалить</SubmitButton>
    );
}