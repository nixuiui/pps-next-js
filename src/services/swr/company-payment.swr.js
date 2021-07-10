import useSWR, { mutate } from "swr";
import { getDetailCompanyPaymentsApi, getListCompanyPaymentsApi } from "../api/company-payment.api";
import { swrOptions } from "./config.swr";

export function getListCompanyPaymentsSwr(param) {
  var page = param?.page ?? 1
  var limit = param?.limit ?? 20
  var search = param?.search ?? ""
  var sortBy = param?.sortBy ?? ""
  var orderBy = param?.orderBy ?? ""
  const { data, mutate, error } = useSWR(
    `/user/payment-companies?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy ?? ""}&orderBy=${orderBy ?? ""}`,
    async () => getListCompanyPaymentsApi(param), 
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

export function getDetailCompanyPaymentSwr(id) {
  const fetcher = async () => getDetailCompanyPaymentsApi(id)
  const { data, mutate, error } = useSWR(`/user/payment-companies/${id}`, fetcher, swrOptions)
  const isLoading = !data && !error
  
  return {
    isLoading,
    data,
    error,
    mutate
  };
}