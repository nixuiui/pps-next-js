import useSWR, { mutate } from "swr";
import { getCompaniesApi } from "../api/master-data.api";
import { swrOptions } from "./config.swr";

export function getCompaniesSwr() {
  const { data, mutate, error } = useSWR(
    `/api/v1/public/companies`,
    async () => getCompaniesApi(), 
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