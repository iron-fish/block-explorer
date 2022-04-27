import axios, { AxiosInstance } from 'axios'

class Service {
  fetcher: AxiosInstance

  constructor(baseUrl) {
    this.fetcher = axios.create({
      baseURL: '/api' + baseUrl
    })
    this.fetcher.interceptors.response.use(
      response => response.data, 
      error => Promise.reject(error)
    )
  }

  toString(): string {
    return 'Service'
  }
}

export default Service
