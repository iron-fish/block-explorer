export function floorTo(value: number, places: number): number {
  const multiplier = Math.pow(10, places)
  const adjusted = value * multiplier
  const truncated = adjusted < 0 ? Math.ceil(adjusted) : Math.floor(adjusted)
  return truncated / multiplier
}
