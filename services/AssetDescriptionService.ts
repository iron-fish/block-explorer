import {
  AssetDescriptionParameters,
  AssetDescriptionType,
  ResponseType,
} from 'types'
import Service from './Service'

export default class AssetDescriptionService extends Service {
  constructor() {
    super('/asset_descriptions')
  }

  get(
    query: AssetDescriptionParameters
  ): Promise<ResponseType<AssetDescriptionType[]>> {
    return this.fetcher.get('', {
      params: query,
    })
  }

  toString(): string {
    return 'AssetDescriptionService'
  }
}
