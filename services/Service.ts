import axios, { AxiosInstance } from 'axios'

class Service {
  fetcher: AxiosInstance

  constructor(baseUrl) {
    this.fetcher = axios.create({
      baseURL: '/api' + baseUrl
    })
  }

  toString(): string {
    return 'Service'
  }
}

export default Service
