import { useState } from "react";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { User } from "entities/user";

export function useList() {
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
        requestAPI.sendRequest(requestAPI.asyncGetAllApplications, _callbackGetAllApplications);
    }

    const _callbackGetAllApplications = (status, data) => {
        switch (status) {
            case 200:
                const applications = dataAction.jsonToObjects(data, User);
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
        requestAPI.sendRequest(()=> requestAPI.asyncAcceptApplications(jsonApplications), _callbackRequestInfo);
    }

    const asyncDeleteApp = async () => {
        requestAPI.sendRequest(()=> requestAPI.asyncDeleteApplications(selectedApp), _callbackRequestInfo);
    }

    const _callbackRequestInfo = (status) => {
        switch (status) {
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