import { localStorageKey } from "../../helpers/consts";
import { requestApi } from "./main.api";

export const loginApi = async (param) => {
    try {
        const response = await requestApi({
            url: `${process.env.NEXT_PUBLIC_REST_API_URL}/login`,
            method: 'POST',
            body: param
        })
        localStorage.setItem(localStorageKey.apiToken, response.token)
        localStorage.setItem(localStorageKey.account, JSON.stringify(response))
        return response
    } catch (err) {
        throw err
    }
};