import prop from 'ramda/src/prop'
import propOr from 'ramda/src/propOr'
import pipe from 'ramda/src/pipe'
import K from 'ramda/src/always'
import ifElse from 'ramda/src/ifElse'
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
