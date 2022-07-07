import prop from 'ramda/src/prop'
import propOr from 'ramda/src/propOr'
import pipe from 'ramda/src/pipe'
import K from 'ramda/src/always'
import ifElse from 'ramda/src/ifElse'
import isNil from 'ramda/src/isNil'
import { parseISO, formatWithOptions } from 'date-fns/fp'
import { enUS } from 'date-fns/locale'

export const formatBlockTimestamp = ifElse(
  propOr(false, 'timestamp'),
  pipe(
    prop('timestamp'),
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatWithOptions({ locale: enUS }, `dd'/'MM'/'yyyy hh':'mm':'ss aa`)
  ),
  K('')
)

export const formatDate = ifElse(
  isNil,
  K(''),
  pipe(
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatWithOptions({ locale: enUS }, `dd'/'MM'/'yyyy`)
  )
)

export const formatTime = ifElse(
  isNil,
  K(''),
  pipe(
    parseISO,
    // TODO: figure out a way to deal with this when we do i18n
    formatWithOptions({ locale: enUS }, `hh':'mm':'ss aa`)
  )
)
