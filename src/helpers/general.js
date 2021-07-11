import moment from "moment";
import { localStorageKey } from "./consts";

export function convertListToOptions(list, label) {
    var options = []
    list?.forEach(val => {
        options = [...options, {value: val, label: val[label ?? 'name'] + ", " + val['companyType']}]
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

export function dateFormat(date) {
    return moment(date).format('LL')
}

export function dateTimeFormat(date) {
    return moment(date).format('LLLL')
}

export function dateTimeFormatInput(date) {
    if(date == null)
        return "-"
    return moment(date).format('YYYY-MM-DD h:mm:ss')
}

export function dateFormatInput(date) {
    if(date == null)
        return null
    return moment(date).format('YYYY-MM-DD')
}