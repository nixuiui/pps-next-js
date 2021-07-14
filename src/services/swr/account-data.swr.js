import useSWR, { mutate } from "swr";
import { getDetailAccountApi, getListAccountApi } from "../api/account-data.api";
import { getDetailPayeeApi, getListPayeesApi } from "../api/payees.api";
import { swrOptions } from "./config.swr";

export function getListAccountSwr(param) {
  var page = param?.page ?? 1
  var limit = param?.limit ?? 20
  var search = param?.search ?? ""
  var sortBy = param?.sortBy ?? ""
  var orderBy = param?.orderBy ?? ""
  const { data, mutate, error } = useSWR(
    `/user/account?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy ?? ""}&orderBy=${orderBy ?? ""}`,
    async () => getListAccountApi(param), 
    swrOptions
  )
  const isLoading = !data && !error
  
  return {
    isLoading,
    data,
    error,
    mutate
  };
}

export function getDetailAccountSwr(id) {
  const fetcher = async () => getDetailAccountApi(id)
  const { data, mutate, error } = useSWR(`/user/account/${id}`, fetcher, swrOptions)
  const isLoading = !data && !error
  
  return {
    isLoading,
    data,
    error,
    mutate
  };
}