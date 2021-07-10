import useSWR, { mutate } from "swr";
import { getDetailCompanyApi, getListCompaniesApi } from "../api/company.api";
import { swrOptions } from "./config.swr";

export function getListCompaniesSwr(param) {
  var page = param?.page ?? 1
  var limit = param?.limit ?? 20
  var search = param?.search ?? ""
  var sortBy = param?.sortBy ?? ""
  var orderBy = param?.orderBy ?? ""
  const { data, mutate, error } = useSWR(
    `/user/companies?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy ?? ""}&orderBy=${orderBy ?? ""}`,
    async () => getListCompaniesApi(param), 
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

export function getDetailCompanySwr(id) {
  const fetcher = async () => getDetailCompanyApi(id)
  const { data, mutate, error } = useSWR(`/user/companies/${id}`, fetcher, swrOptions)
  const isLoading = !data && !error
  
  return {
    isLoading,
    data,
    error,
    mutate
  };
}