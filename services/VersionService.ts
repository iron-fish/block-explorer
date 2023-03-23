import axios, { AxiosInstance } from 'axios'
import { NodeVersionType } from 'types'

class VersionService {
  fetcher: AxiosInstance

  constructor() {
    this.fetcher = axios.create({
      baseURL: 'https://api.github.com',
    })

    this.fetcher.interceptors.response.use(
      response => response.data,
      error => Promise.reject(error)
    )
  }

  async current(): Promise<NodeVersionType> {
    const data = await this.fetcher.get(
      '/repos/iron-fish/ironfish/releases?page=1&per_page=1'
    )
    return data[0] as NodeVersionType
  }

  toString(): string {
    return 'VersionService'
  }
}

export default VersionService
