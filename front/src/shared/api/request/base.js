import { Response } from "./response";

export const interceptors = {};

let responseInterceptor = undefined;
let requestInterceptor = undefined;

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    }
}


const contentIs = (headers, type) => {
    return headers.get("Content-Type")?.includes(type) ?? false;
}

export const requestInstance = {
    async sendRequest(method, uri, data) {
        requestInterceptor && requestInterceptor(config);

        const headers = new Headers(config.headers);

        method = method.toLowerCase();
        if (method === "delete") {
            headers.append("Data", JSON.stringify(data));
        }

        const body = contentIs(headers, "application/json") && data && method !== "delete"
            ? JSON.stringify(data)
            : undefined;


        const response = await fetch(uri, { method: method, headers: headers, body: body });

        responseInterceptor && responseInterceptor(response.status);

        const answer = contentIs(response.headers, "application/json")
            ? await response.json()
            : await response.text();

        return new Response(response.status, answer);
    },

    interceptors: {
        response: {
            use(callback) {
                responseInterceptor = callback;
            }
        },
        request: {
            use(callback) {
                requestInterceptor = callback;
            }
        },
    }

}