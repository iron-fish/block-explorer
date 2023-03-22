import { createContext, FC, ReactNode } from 'react'

import BlockService from 'services/BlockService'
import AssetService from 'services/AssetService'
import TransactionService from 'services/TransactionService'
import VersionService from 'services/VersionService'
import AssetDescriptionService from 'services/AssetDescriptionService'

export const BlockContext = createContext<BlockService | null>(null)
export const AssetContext = createContext<AssetService | null>(null)
export const AssetDescriptionContext =
  createContext<AssetDescriptionService | null>(null)
export const TransactionContext = createContext<TransactionService | null>(null)
export const VersionContext = createContext<VersionService | null>(null)

const ServiceContexts: FC<{ children: ReactNode }> = ({ children }) => (
  <BlockContext.Provider value={new BlockService()}>
    <AssetContext.Provider value={new AssetService()}>
      <AssetDescriptionContext.Provider value={new AssetDescriptionService()}>
        <TransactionContext.Provider value={new TransactionService()}>
          <VersionContext.Provider value={new VersionService()}>
            {children}
          </VersionContext.Provider>
        </TransactionContext.Provider>
      </AssetDescriptionContext.Provider>
    </AssetContext.Provider>
  </BlockContext.Provider>
)

export default ServiceContexts
