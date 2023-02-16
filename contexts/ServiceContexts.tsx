import { createContext, FC } from 'react'

import BlockService from 'services/BlockService'
import AssetService from 'services/AssetService'
import TransactionService from 'services/TransactionService'
import VersionService from 'services/VersionService'

export const BlockContext = createContext<BlockService | null>(null)
export const AssetContext = createContext<AssetService | null>(null)
export const TransactionContext = createContext<TransactionService | null>(null)
export const VersionContext = createContext<VersionService | null>(null)

const ServiceContexts: FC = ({ children }) => (
  <BlockContext.Provider value={new BlockService()}>
    <AssetContext.Provider value={new AssetService()}>
      <TransactionContext.Provider value={new TransactionService()}>
        <VersionContext.Provider value={new VersionService()}>
          {children}
        </VersionContext.Provider>
      </TransactionContext.Provider>
    </AssetContext.Provider>
  </BlockContext.Provider>
)

export default ServiceContexts
