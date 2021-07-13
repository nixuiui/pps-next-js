import useSWR, { mutate } from "swr";
import { getDetailPayeeApi, getListPayeesApi } from "../api/payees.api";
import { swrOptions } from "./config.swr";

export function getListPayeesSwr(param) {
  var page = param?.page ?? 1
  var limit = param?.limit ?? 20
  var search = param?.search ?? ""
  var sortBy = param?.sortBy ?? ""
  var orderBy = param?.orderBy ?? ""
  const { data, mutate, error } = useSWR(
    `/user/payees?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy ?? ""}&orderBy=${orderBy ?? ""}`,
    async () => getListPayeesApi(param), 
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

export function getDetailPayeeSwr(id) {
  const fetcher = async () => getDetailPayeeApi(id)
  const { data, mutate, error } = useSWR(`/user/payee/${id}`, fetcher, swrOptions)
  const isLoading = !data && !error
  
  return {
    isLoading,
    data,
    error,
    mutate
  };
}