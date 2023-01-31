import { mean, defaultTo, pipe, curry, map } from 'ramda'

export const getAverageWithAccessor = curry((accessor, data) =>
  pipe(defaultTo([]), map(accessor), mean, Math.ceil)(data)
)
