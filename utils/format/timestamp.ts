import prop from 'ramda/src/prop'
import propOr from 'ramda/src/propOr'
import pipe from 'ramda/src/pipe'
import K from 'ramda/src/always'
import ifElse from 'ramda/src/ifElse'
import isNil from 'ramda/src/isNil'
import { parseISO } from 'date-fns/fp'
import { formatInTimeZone } from 'date-fns-tz/fp'

export const formatBlockTimestamp = ifElse(
  propOr(false, 'timestamp'),
  pipe(
    prop('timestamp'),
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatInTimeZone(`dd'-'MM'-'yyyy kk':'mm':'ss`, 'UTC')
  ),
  K('')
)

export const formatDate = ifElse(
  isNil,
  K(''),
  pipe(
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatInTimeZone(`dd'-'MM'-'yyyy`, 'UTC')
  )
)

export const formatTime = ifElse(
  isNil,
  K(''),
  pipe(
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatInTimeZone(`kk':'mm':'ss`, 'UTC')
  )
)
