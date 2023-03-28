import { Box } from '@ironfish/ui-kit'
import { useMemo } from 'react'
import { formatTime, formatDate } from 'utils/format'

const TableCellTimeStamp = ({ timestamp }: { timestamp: string | Date }) => {
  const [formattedDate, formattedTime] = useMemo(
    () => [formatDate(timestamp), formatTime(timestamp)],
    [timestamp]
  )

  return (
    <Box
      width={{ base: 'max-content', lg: 'auto' }}
      wordBreak={{ base: 'keep-all', lg: 'break-word' }}
    >
      {formattedDate} {formattedTime}
    </Box>
  )
}

export default TableCellTimeStamp
