import { useModel } from "../model";
import { SubmitButton } from "shared/ui/SubmitButton";

export function AcceptApplications() {

    const { asyncAcceptApp } = useModel();

    return (
        <SubmitButton onClick={asyncAcceptApp}>Принять</SubmitButton>
    );
}