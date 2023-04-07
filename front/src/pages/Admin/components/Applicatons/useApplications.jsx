import { useState } from "react";
import { useValidate } from "../../../../hook/useUserStore";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { asyncAcceptApplications, asyncDeleteApplications, asyncGetAllApplications } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/dataAction";
import { User } from "../../../../core/model/transport/User";

export function useApplications() {
    const { signOut } = useValidate();
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState([]);
    const roles = ["client", "admin"];


    const selectApplication = (id) =>
        setSelectedApp((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });

    const _asyncGetApplications = async () => {
        const response = await asyncGetAllApplications();
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetAllApplications(status, data);
    }

    const _callbackGetAllApplications = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 200:
                const applications = jsonToObjects(data, User);
                applications.forEach(({ user }) => {
                    user["role"] = "client";
                })
                setApplications(applications);
                break;
            default:
                break;
        }
    }

    const selectHandler = (e, id) => {
        const appCopy = applications.slice(0);
        appCopy.forEach(({ user }) => {
            if (user["id"] === id) {
                user["role"] = e.target.value;
                setApplications(appCopy);
                return;
            }
        });
    }

    const _getAcceptInfo = () => {
        const jsonApplications = [];
        if (selectedApp.length === 0) return;
        applications.forEach(({ user }) => {
            if (selectedApp.includes(user["id"])) {
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
        const response = await asyncAcceptApplications(jsonApplications);
        const status = response.getStatus();
        _callbackRequestInfo(status);
    }

    const asyncDeleteApp = async () => {
        const jsonAppId = [];
        selectedApp.forEach(id => {
            jsonAppId.push({ id: id });
        });
        const response = await asyncDeleteApplications(jsonAppId);
        const status = response.getStatus();
        _callbackRequestInfo(status);
    }

    const _callbackRequestInfo = (status) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 204:
            case 202:
                setSelectedApp([]);
                _asyncGetApplications();
                break;
            default:
                break;
        }
    }

    useMountEffect(_asyncGetApplications);

    return {
        applications, selectedApp, selectApplication,
        asyncAcceptApp, asyncDeleteApp, 
        selectHandler, roles
    }
}