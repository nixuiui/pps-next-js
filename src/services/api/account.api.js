import { localStorageKey } from "../../helpers/consts";
import { requestApi } from "./main.api";

export const accountApi = async () => {
    try {
        const response = await requestApi({
            url: `${process.env.NEXT_PUBLIC_REST_API_URL}/user/me`,
            method: 'GET',
            isAuth: true
        })
        localStorage.setItem(localStorageKey.account, JSON.stringify(response))
        return response
    } catch (err) {
        throw err
    }
};

export const updateProfileApi = async (data) => {
    try {
        const response = await requestApi({
            url: `${process.env.NEXT_PUBLIC_REST_API_URL}/user/me`,
            method: 'PATCH',
            isAuth: true,
            body: data,
        })
        localStorage.setItem(localStorageKey.account, JSON.stringify(response))
        return response
    } catch (err) {
        throw err
    }
};

export const changePasswordApi = async (data) => {
    try {
        const response = await requestApi({
            url: `${process.env.NEXT_PUBLIC_REST_API_URL}/user/change-password`,
            method: 'POST',
            isAuth: true,
            body: data,
        })
        return response
    } catch (err) {
        throw err
    }
};