import curry from 'ramda/src/curry'
import defaultTo from 'ramda/src/defaultTo'
import pipe from 'ramda/src/pipe'
import propOr from 'ramda/src/propOr'

export const safeProp = curry((property, x) =>
  pipe(defaultTo({}), propOr('', property))(x)
)

export default safeProp
