import prop from 'ramda/src/prop'
import propOr from 'ramda/src/propOr'
import pipe from 'ramda/src/pipe'
import K from 'ramda/src/always'
import ifElse from 'ramda/src/ifElse'
import { parseISO, intlFormat } from 'date-fns'

export const formatBlockTimestamp = ifElse(
  propOr(false, 'timestamp'),
  pipe(prop('timestamp'), parseISO, intlFormat),
  K('')
)
