import { SERVER_PATH } from "Consts/REST";
import { POST } from "Utils/REST";

export class AuthServices {
    constructor() {}

    logIn(request: any, setLogin: (jwt: string, userId: string) => void) {
        return POST(`${SERVER_PATH}/api/user/login`, request).then(
            (response: {token: string, userId: string}) => {
                console.log('json', response);
                setLogin(response.token, response.userId)
            },
            (err) => console.error('Login error', err)
        );
    }

    register(request: any, setLogin: (jwt: string, userId: string) => void) {
        return POST(`${SERVER_PATH}/api/user/register`, request).then(
            (response) => setLogin(response.jwt, response.userId),
            (err) => console.log('Login error', err)
        );
    }
}