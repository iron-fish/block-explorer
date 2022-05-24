import mean from "ramda/src/mean";
import pipe from 'ramda/src/pipe'
import curry from 'ramda/src/curry'
import map from 'ramda/src/map'

export const getAverageWithAccessor = curry((accessor, data) => pipe(
  map(accessor),
  mean,
  Math.ceil
)(data))
