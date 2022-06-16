import { NodeVersionType } from 'types'
import Service from './Service'

class VersionService extends Service {
  constructor() {
    super('/versions')
  }

  current(): Promise<NodeVersionType> {
    return this.fetcher.get('')
  }

  toString(): string {
    return 'VersionService'
  }
}

export default VersionService
