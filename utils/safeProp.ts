export function safeProp(property: string) {
  return item => item?.[property] ?? ''
}

export default safeProp
