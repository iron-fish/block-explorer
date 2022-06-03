import { FC, useMemo } from 'react'
import { pipe, of, ap, objOf } from 'ramda'

import { useBreakpointValue } from '@ironfish/ui-kit'
import { formatBlockTimestamp, formatTime, formatDate } from 'utils/format'

const TimeStamp: FC<{ timestamp: string }> = ({ timestamp }) => {
  const useDelimiter = useBreakpointValue({ base: false, sm: true, xl: false })

  const [formattedTimestamp, formattedDate, formattedTime] = useMemo(
    () =>
      pipe(
        of,
        ap([
          pipe(objOf('timestamp'), formatBlockTimestamp),
          formatDate,
          formatTime,
        ])
      )(timestamp),
    [timestamp]
  )

  return (
    <>
      {useDelimiter ? (
        <>
          {formattedDate}
          <br />
          {formattedTime}
        </>
      ) : (
        formattedTimestamp
      )}
    </>
  )
}

export default TimeStamp
