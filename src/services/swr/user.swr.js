import useSWR, { mutate } from "swr";
import { getDetailUserApi, getListUsersApi } from "../api/user.api";
import { swrOptions } from "./config.swr";

export function getListUsersSwr(param) {
  var page = param?.page ?? 1
  var limit = param?.limit ?? 20
  var search = param?.search ?? ""
  var sortBy = param?.sortBy ?? ""
  var orderBy = param?.orderBy ?? ""
  const { data, mutate, error } = useSWR(
    `/user/users?search=${search}&page=${page}&limit=${limit}&sortBy=${param?.sortBy ?? ""}&orderBy=${param?.orderBy ?? ""}`,
    async () => getListUsersApi(param), 
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

export function getDetailUserSwr(id) {
  const fetcher = async () => getDetailUserApi(id)
  const { data, mutate, error } = useSWR(`/user/users/${id}`, fetcher, swrOptions)
  const isLoading = !data && !error
  
  return {
    isLoading,
    data,
    error,
    mutate
  };
}