import { post } from "./apiHelper"

export const userRegister = async(param) => {
    const resp = post('userRegister', param);
    return resp;
}

export const loginUser = async(param) => {
    const resp = post('auth', param);
    return resp;
}