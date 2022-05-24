import { FC, useState } from 'react'
import {
  InputProps,
  useBreakpointValue,
  Flex,
  Box,
  NAMED_COLORS,
} from '@ironfish/ui-kit'
/** ---------------------------------------------------------------------------
 * This component is a mock up of implementation in UI kit and must be replaced
 * ----------------------------------------------------------------------------
 */
import DemoSearchComponent, { SearchOptionType } from './DemoSearchComponent'
/** ---------------------------------------------------------------------------
 * ----------------------------------------------------------------------------*/
import { truncateHash } from 'utils/hash'
import { SearchIcon } from 'svgx'
import useBlocksSearch from 'hooks/useBlocksSearch'
import { BlockType, TransactionType } from 'types'
import BlockIcon from 'icons/BlockIcon'

const Option: FC<SearchOptionType> = ({ id, value }) => {
  const $hashValue = useBreakpointValue({
    base: truncateHash(value.toString(), 2),
    md: value,
  })
  return (
    <Flex minH="30px" alignItems="center">
      <Box mr="16px">
        <BlockIcon w="1.625rem" h="1.875rem" />
      </Box>
      <Box
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        color={NAMED_COLORS.LIGHT_BLUE}
      >
        {id} - {$hashValue}
      </Box>
    </Flex>
  )
}

function isBlock(x: unknown): x is BlockType {
  return typeof x === 'object' && !!x && 'transactions' in x && !('block' in x)
}

const getOptionObject = (option: BlockType | TransactionType): string => {
  if (!option) {
    return ''
  }

  if (isBlock(option)) {
    return 'Blocks'
  }

  return 'Transactions'
}

const SearchInput: FC<InputProps> = () => {
  const shortSearchPlaceHolder = 'Search'
  const longSearchPlaceHolder = 'Search by block height, hash or transaction'
  const $placeholder = useBreakpointValue({
    base: longSearchPlaceHolder,
    sm: shortSearchPlaceHolder,
    xl: longSearchPlaceHolder,
  })

  const [$search, $setSearch] = useState<string>()

  const { data } = useBlocksSearch($search, 5)

  return (
    <DemoSearchComponent
      variant="nav_search"
      InputProps={{
        placeholder: $placeholder,
        onChange: e => $setSearch(e.target.value),
      }}
      inputLeftElement={<SearchIcon />}
      options={data?.data.map((item: BlockType | TransactionType) => ({
        label: `${item.id} - ${item.hash}`,
        value: item.hash,
        id: item.id,
        object: getOptionObject(item),
      }))}
      renderOption={option => <Option {...option} />}
      onSelectOption={() => $setSearch('')}
    />
  )
}

export default SearchInput
