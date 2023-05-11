import { SubmitButton } from "shared/ui/SubmitButton";
import { useModel } from "../model";

export function AcceptApplications() {

    const { asyncAcceptApp } = useModel();

    return (
        <SubmitButton onClick={asyncAcceptApp}>Принять</SubmitButton>
    );
}