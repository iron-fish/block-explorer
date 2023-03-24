import { Box } from '@ironfish/ui-kit'

import { formatBlockTimestamp } from 'utils/format'

const TableCellTimeStamp = ({ timestamp }: { timestamp: string | Date }) => (
  <Box
    width={{ base: 'max-content', lg: 'auto' }}
    wordBreak={{ base: 'keep-all', lg: 'break-all' }}
  >
    {formatBlockTimestamp({ timestamp })}
  </Box>
)

export default TableCellTimeStamp
