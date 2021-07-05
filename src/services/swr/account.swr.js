import useSWR, { mutate } from "swr";
import { accountApi } from "../api/account.api";
import { swrOptions } from "./config.swr";

export function getAccountSwr() {
  const { data, mutate, error } = useSWR(
    `/api/v1/user/account`,
    async () => accountApi(), 
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