import { getLanguage } from "helpers/language"
import { localStorageKey } from "../../helpers/consts"

const hostApi = "http://127.0.0.1:1323"

const requestApi = async (param) => {
    try {
        const token = localStorage.getItem(localStorageKey.apiToken)
        const language = getLanguage()
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': param.isAuth ? `Bearer ${token}` : '',
            'Language': language
        }
        if(param.isFormData) headers = {
            'Authorization': param.isAuth ? `Bearer ${token}` : '',
            'Language': language
        }
        const response = await fetch(
            param.url,
            {
                method: param.method,
                headers: headers,
                body: param.body ? (param.isFormData ? param.body : JSON.stringify(param.body)) : null,
            },
        )
            
        const data = await response.json()
        if(response.status == 200) {
            return data.data
        } else if (response.status == 401) {
            throw data.message
        } else if (response.status == 400) {
            throw data.message
        } else if (response.status == 404) {
            throw "Source Not Found"
        } else {
            throw "Failed"
        }
    } catch (err) {
        throw `${err}`
    }
}

export {hostApi, requestApi}