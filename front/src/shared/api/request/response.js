export class Response {
    #body;
    #status;
    #status_set = {
        401: 401,
        200: 200,
        202: 202,
        204: 204,
        400: 400,
        409: 409,
    }

    constructor(status, body) {
        this.#status = this.#status_set[status];
        this.#body = body;
    }

    setBody(body) {
        this.#body = body;
    }

    setStatus(status) {
        this.#status = this.status_set[status];
    }

    getBody() {
        return this.#body;
    }

    getStatus() {
        return this.#status;
    }

}