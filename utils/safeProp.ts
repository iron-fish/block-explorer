import { curry, defaultTo, pipe, propOr } from 'ramda'

export const safeProp = curry((property, x) =>
  pipe(defaultTo({}), propOr('', property))(x)
)

export default safeProp
