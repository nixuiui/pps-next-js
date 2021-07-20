import useSWR, { mutate } from "swr";
import { getDetailPaymentRequestApi, getListPaymentRequestApi } from "../api/payment-request.api";
import { swrOptions } from "./config.swr";

export function getListPaymentRequestSwr(param) {
  var page = param?.page ?? 1
  var limit = param?.limit ?? 20
  var search = param?.search ?? ""
  var sortBy = param?.sortBy ?? ""
  var orderBy = param?.orderBy ?? ""
  const { data, mutate, error } = useSWR(
    `/user/payment-request?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy ?? ""}&orderBy=${orderBy ?? ""}`,
    async () => getListPaymentRequestApi(param), 
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

export function getDetailPaymentRequestSwr(id) {
  const fetcher = async () => getDetailPaymentRequestApi(id)
  const { data, mutate, error } = useSWR(`/user/payment-request/${id}`, fetcher, swrOptions)
  const isLoading = !data && !error
  
  return {
    isLoading,
    data,
    error,
    mutate
  };
}