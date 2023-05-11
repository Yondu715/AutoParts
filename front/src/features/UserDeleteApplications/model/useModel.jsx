import { userModel } from "entities/user";

export function useModel() {
    const selectedApplications = userModel.useSelectedUsers();
    const { deleteApplicationsAsync } = userModel.useModel();

    const asyncDeleteApp = async () => {
        deleteApplicationsAsync(selectedApplications);
    }
    
    return { asyncDeleteApp };
}