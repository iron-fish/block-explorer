import { createContext, FC } from 'react'

import BlockService from 'services/BlockService'
import TransactionService from 'services/TransactionService'

export const BlockContext = createContext<BlockService | null>(null)
export const TransactionContext = createContext<TransactionService | null>(null)

const ServiceContexts: FC = ({ children }) => (
  <BlockContext.Provider value={new BlockService()}>
    <TransactionContext.Provider value={new TransactionService()}>
      {children}
    </TransactionContext.Provider>
  </BlockContext.Provider>
)

export default ServiceContexts
