import { SERVER_PATH } from "Consts/REST";
import { GET, POST } from "Utils/REST";

export class AuthServices {
    constructor() {}

    logIn(request: any, setLogin: (userId: string) => void) {
        return POST<{userId: string}>(`${SERVER_PATH}/api/user/login`, request).then(
            (response) => {
                console.log('json', response);
                setLogin(response.userId)
            },
            (err) => console.log('Login error', err)
        );
    }

    register(request: any, setLogin: (userId: string) => void) {
        return POST<{userId: string}>(`${SERVER_PATH}/api/user/register`, request).then(
            (response) => setLogin(response.userId),
            (err) => console.log('Login error', err)
        );
    }

    test() {
        return GET(`${SERVER_PATH}/api`).then(
            response => console.log('response', response),
            err => console.log('error', err)
        );
    }
}