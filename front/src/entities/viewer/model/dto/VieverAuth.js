export class VieverAuth {
    #login;
    #password;

    constructor({login, password}){
        this.#login = login;
        this.#password = password;
    }

    setLogin(login){
        this.#login = login;
    }

    setPassword(password) {
        this.#password = password;
    }

    getLogin(){
        return this.#login;
    }

    getPassword(){
        return this.#password;
    }

    get() {
        return {
            login: this.#login,
            password: this.#password
        }
    }
}