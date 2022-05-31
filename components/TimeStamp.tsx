import { FC, useMemo } from 'react'

import { useBreakpointValue } from '@ironfish/ui-kit'
import { formatBlockTimestamp, formatTime, formatDate } from 'utils/format'

const TimeStamp: FC<{ timestamp: string }> = ({ timestamp }) => {
  const useDelimiter = useBreakpointValue({ base: false, sm: true, xl: false })

  const date = useMemo(() => {
    const formattedTimestamp = formatBlockTimestamp({ timestamp })
    const formattedDate = formatDate(timestamp)
    const formattedTime = formatTime(timestamp)
    return {
      formattedTimestamp,
      formattedDate,
      formattedTime,
    }
  }, [timestamp])

  return (
    <>
      {useDelimiter ? (
        <>
          {date.formattedDate}
          <br />
          {date.formattedTime}
        </>
      ) : (
        date.formattedTimestamp
      )}
    </>
  )
}

export default TimeStamp
