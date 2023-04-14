import { Response } from "./response";


export const sendRequest = async (method, uri, data, options) => {
    const headers = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": localStorage.getItem("token"),
        ...options
    });

    method = method.toLowerCase();
    if (method === "delete") {
        headers.append("Data", JSON.stringify(data));
    }

    const body = contentIs(headers, "application/json") && data && method !== "delete"
        ? JSON.stringify(data)
        : undefined;

    const response = await fetch(uri, { method: method, headers: headers, body: body });

    const answer = contentIs(response.headers, "application/json")
        ? await response.json()
        : await response.text();

    return new Response(response.status, answer);
}

const contentIs = (headers, type) => {
    return headers.get("Content-Type")?.includes(type) ?? false;
}