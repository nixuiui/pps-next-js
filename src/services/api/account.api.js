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