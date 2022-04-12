import { createContext, FC } from "react";
import BlockService from "services/BlockService";

export const BlockContext = createContext<BlockService | null>(null)

const Contexts: FC = ({ children }) => (
  <BlockContext.Provider value={new BlockService()}>
    {children}
  </BlockContext.Provider>
)

export default Contexts
