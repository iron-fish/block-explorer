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
import type {
  BlocksListParams,
  BlocksFindParams,
  BlocksMetricsParams
} from './ironfish.schemas'



/**
 * @summary Gets the head of the chain
 */
export const blocksHead = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/blocks/head`,options
    );
  }


export const getBlocksHeadQueryKey = () => [`/blocks/head`];

    
export type BlocksHeadQueryResult = NonNullable<Awaited<ReturnType<typeof blocksHead>>>
export type BlocksHeadQueryError = AxiosError<unknown>

export const useBlocksHead = <TData = Awaited<ReturnType<typeof blocksHead>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof blocksHead>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBlocksHeadQueryKey();

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof blocksHead>>> = ({ signal }) => blocksHead({ signal, ...axiosOptions });


  

  const query = useQuery<Awaited<ReturnType<typeof blocksHead>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Returns a paginated list of blocks from the chain
 */
export const blocksList = (
    params?: BlocksListParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/blocks`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getBlocksListQueryKey = (params?: BlocksListParams,) => [`/blocks`, ...(params ? [params]: [])];

    
export type BlocksListQueryResult = NonNullable<Awaited<ReturnType<typeof blocksList>>>
export type BlocksListQueryError = AxiosError<unknown>

export const useBlocksList = <TData = Awaited<ReturnType<typeof blocksList>>, TError = AxiosError<unknown>>(
 params?: BlocksListParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof blocksList>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBlocksListQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof blocksList>>> = ({ signal }) => blocksList(params, { signal, ...axiosOptions });


  

  const query = useQuery<Awaited<ReturnType<typeof blocksList>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Returns the global status of the chain
 */
export const blocksStatus = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/blocks/status`,options
    );
  }


export const getBlocksStatusQueryKey = () => [`/blocks/status`];

    
export type BlocksStatusQueryResult = NonNullable<Awaited<ReturnType<typeof blocksStatus>>>
export type BlocksStatusQueryError = AxiosError<unknown>

export const useBlocksStatus = <TData = Awaited<ReturnType<typeof blocksStatus>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof blocksStatus>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBlocksStatusQueryKey();

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof blocksStatus>>> = ({ signal }) => blocksStatus({ signal, ...axiosOptions });


  

  const query = useQuery<Awaited<ReturnType<typeof blocksStatus>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Gets a specific block by 'hash' or 'sequence'
 */
export const blocksFind = (
    params?: BlocksFindParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/blocks/find`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getBlocksFindQueryKey = (params?: BlocksFindParams,) => [`/blocks/find`, ...(params ? [params]: [])];

    
export type BlocksFindQueryResult = NonNullable<Awaited<ReturnType<typeof blocksFind>>>
export type BlocksFindQueryError = AxiosError<unknown>

export const useBlocksFind = <TData = Awaited<ReturnType<typeof blocksFind>>, TError = AxiosError<unknown>>(
 params?: BlocksFindParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof blocksFind>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBlocksFindQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof blocksFind>>> = ({ signal }) => blocksFind(params, { signal, ...axiosOptions });


  

  const query = useQuery<Awaited<ReturnType<typeof blocksFind>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Gets metrics for blocks
 */
export const blocksMetrics = (
    params: BlocksMetricsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/blocks/metrics`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getBlocksMetricsQueryKey = (params: BlocksMetricsParams,) => [`/blocks/metrics`, ...(params ? [params]: [])];

    
export type BlocksMetricsQueryResult = NonNullable<Awaited<ReturnType<typeof blocksMetrics>>>
export type BlocksMetricsQueryError = AxiosError<unknown>

export const useBlocksMetrics = <TData = Awaited<ReturnType<typeof blocksMetrics>>, TError = AxiosError<unknown>>(
 params: BlocksMetricsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof blocksMetrics>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBlocksMetricsQueryKey(params);

  


  const queryFn: QueryFunction<Awaited<ReturnType<typeof blocksMetrics>>> = ({ signal }) => blocksMetrics(params, { signal, ...axiosOptions });


  

  const query = useQuery<Awaited<ReturnType<typeof blocksMetrics>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

