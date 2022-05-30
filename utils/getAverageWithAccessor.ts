import mean from 'ramda/src/mean'
import defaultTo from 'ramda/src/defaultTo'
import pipe from 'ramda/src/pipe'
import curry from 'ramda/src/curry'
import map from 'ramda/src/map'

export const getAverageWithAccessor = curry((accessor, data) =>
  pipe(defaultTo([]), map(accessor), mean, Math.ceil)(data)
)
