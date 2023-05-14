export class VieverReg {
    #login;
    #password;
    #repeatPassword;

    constructor({ login, password, repeatPassword }) {
        this.#login = login;
        this.#password = password;
        this.#repeatPassword = repeatPassword;
    }

    setLogin(login) {
        this.#login = login;
    }

    setPassword(password) {
        this.#password = password;
    }

    setRepeatPassword(repeatPassword) {
        this.#repeatPassword = repeatPassword;
    }

    getLogin() {
        return this.#login;
    }

    getPassword() {
        return this.#password;
    }

    getRepeatPassword() {
        return this.#repeatPassword;
    }

    get() {
        return {
            login: this.#login,
            password: this.#password,
            repeatPassword: this.#repeatPassword
        }
    }
}