import { localStorageKey } from "./consts";

export function convertListToOptions(list, label) {
    var options = []
    list?.forEach(val => {
        options = [...options, {value: val, label: val[label ?? 'name']}]
    });
    return options;
}

export const isLoggedIn = () => {
    const token = localStorage.getItem(localStorageKey.apiToken)
    if (token != "" && token != "undefined" && token != null) {
        return true
    } else {
        localStorage.removeItem(localStorageKey.apiToken)
        return false
    }
}