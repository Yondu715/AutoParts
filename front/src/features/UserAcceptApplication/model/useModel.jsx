import { userModel } from "entities/user";

export function useModel() {

    const applications = userModel.useUsers();
    const selectedApplications = userModel.useSelectedUsers();
    const { acceptApplicationsAsync } = userModel.useModel();

    const _getAcceptInfo = () => {
        const jsonApplications = [];
        if (selectedApplications.length === 0) return;
        applications.forEach((user) => {
            if (selectedApplications.includes(user["id"])) {
                jsonApplications.push({
                    id: user["id"],
                    role: user["role"],
                })
            }
        })
        return jsonApplications;
    }

    const asyncAcceptApp = async () => {
        const jsonApplications = _getAcceptInfo();
        acceptApplicationsAsync(jsonApplications);
    }

    return { asyncAcceptApp };
}