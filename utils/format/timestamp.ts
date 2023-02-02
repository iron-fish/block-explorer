import { prop, propOr, pipe, always, ifElse, isNil } from 'ramda'
import { parseISO } from 'date-fns/fp'
import { formatInTimeZone } from 'date-fns-tz/fp'

export const formatBlockTimestamp = ifElse(
  propOr(false, 'timestamp'),
  pipe(
    prop('timestamp'),
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatInTimeZone(`dd'-'MM'-'yyyy HH':'mm':'ss zzz`, 'UTC')
  ),
  always('')
)

export const formatDate = ifElse(
  isNil,
  always(''),
  pipe(
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatInTimeZone(`dd'-'MM'-'yyyy`, 'UTC')
  )
)

export const formatTime = ifElse(
  isNil,
  always(''),
  pipe(
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatInTimeZone(`HH':'mm':'ss zzz`, 'UTC')
  )
)
