export interface Metric {
  date: string | Date
  // Average block time for the day
  average_block_time_ms: number
  // Average block difficulty for the day
  average_difficulty: number
  // Number of blocks for the day
  blocks_count: number
  // Number of blocks with a graffiti
  blocks_with_graffiti_count: number
  // Heaviest head sequence at end of day
  chain_height: number
  // Cumulative unique graffitis from genesis to end of date
  cumulative_unique_graffiti: number
  // Number of transactions for the day
  transactions_count: number
  // Number of unique graffitis for the day
  unique_graffiti_count: number
}

export default Metric
