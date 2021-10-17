import { SERVER_PATH } from "Consts/REST";
import {isEmpty} from "lodash";
import { POST } from "Utils/REST";

export class AuthServices {
    constructor() {}

    // async logIn(request: any, setLogin: (jwt: string, userId: string) => void) {
    //     try {
    //         let response = await POST(`${SERVER_PATH}/api/user/login`, request);

    //         console.log('json', response);
    //         response && setLogin(response.token, response.userId);
    //     } catch (error) {
    //         console.error('Login error', error);
    //     }
    // }
    async logIn(data: any) {
        try {
            if (isEmpty(data) || !data.email || !data.password) return;
            let response = await POST(`${SERVER_PATH}/api/user/login`, data);

            console.log('json', response);
            return response;
        } catch (error) {
            console.error('Login error', error);
        }
    }


    async register(data: any) {
        try {
            let response = await POST('http://localhost/api/user/register', data);
            
            return response;
        } catch (error) {

            console.log('Login error', error)
        }
    }

    async loadUser(data: any) {
        try {
            return await POST(`${SERVER_PATH}/api/user/login`, data);
        } catch (error) {
            console.error('Login error', error);
        }
    }

    async logOut() {
        try {
            let response = await POST(`${SERVER_PATH}/api/user/login`);

            console.log('json', response);
        } catch (error) {
            console.error('Login error', error);
        }
    }
}