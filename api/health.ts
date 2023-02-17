/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Iron Fish API
 * The Rest API to enable public access to Iron Fish data
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from '@tanstack/react-query'



/**
 * @summary Gets the health of the Iron Fish API
 */
export const healthHealth = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/health`,options
    );
  }


export const getHealthHealthQueryKey = () => [`/health`];

    
export type HealthHealthQueryResult = NonNullable<Awaited<ReturnType<typeof healthHealth>>>
export type HealthHealthQueryError = AxiosError<unknown>

export const useHealthHealth = <TData = Awaited<ReturnType<typeof healthHealth>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof healthHealth>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getHealthHealthQueryKey();

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof healthHealth>>> = ({ signal }) => healthHealth({ signal, ...axiosOptions });


  

  const query = useQuery<Awaited<ReturnType<typeof healthHealth>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

