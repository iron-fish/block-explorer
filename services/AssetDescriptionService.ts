import { AssetType } from 'types'
import Service from './Service'

export default class AssetDescriptionService extends Service {
  constructor() {
    super('/assets')
  }

  find(query: { id: string }): Promise<AssetType> {
    return this.fetcher.get('/find', {
      params: query,
    })
  }

  toString(): string {
    return 'AssetDescriptionService'
  }
}
