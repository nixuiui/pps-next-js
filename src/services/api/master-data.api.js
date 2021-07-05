import { requestApi } from "./main.api";

export const getCompaniesApi = async () => {
    try {
        const response = await requestApi({
            url: `${process.env.NEXT_PUBLIC_REST_API_URL}/public/companies`,
            method: 'GET',
        })
        return response
    } catch (err) {
        throw err
    }
};