import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { asyncAcceptApplications, asyncDeleteApplications, asyncGetAllApplications } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { User } from "../../../../core/model/transport/User";
import { useMountEffect } from "../../../../hook/useMountEffect";

export function useApplications() {
    const { signOut } = useValidate();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState([]);
    const roles = ["client", "admin"];


    const _selectApplication = (id) =>
        setSelectedApp((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });



    const _asyncGetAllApplications = async () => {
        const response = await asyncGetAllApplications();
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetAllApplications(status, data);
    }

    const _callbackGetAllApplications = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                navigate("/auth");
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

    const _selectHandler = (e, id) => {
        const appCopy = applications;
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


    const _asyncAcceptApplications = async () => {
        const jsonApplications = _getAcceptInfo();
        const response = await asyncAcceptApplications(jsonApplications);
        const status = response.getStatus();
        _callbackRequestInfo(status);
    }

    const _asyncDeleteApplications = async () => {
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
                navigate("/auth");
                break;
            case 204:
            case 202:
                setSelectedApp([]);
                _asyncGetAllApplications();
                break;
            default:
                break;
        }
    }

    useMountEffect(_asyncGetAllApplications);

    return {
        applications, selectedApp, _selectApplication,
        _asyncAcceptApplications, _asyncDeleteApplications, 
        _selectHandler, roles
    }
}