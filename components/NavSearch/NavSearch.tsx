import { FC, useState } from 'react'
import {
  InputProps,
  useBreakpointValue,
  Flex,
  Box,
  NAMED_COLORS,
  SearchAutocomplete,
} from '@ironfish/ui-kit'

import { SearchIcon } from 'svgx'
import useBlocksSearch from 'hooks/useBlocksSearch'
import { BlockType, TransactionType, isBlock } from 'types'
import BlockIcon from 'icons/BlockIcon'
import RoutePaths from 'constants/RoutePaths'
import { useRouter } from 'next/router'

const Option: FC<{ label: string }> = ({ label }) => {
  return (
    <Flex minH="1.875rem" alignItems="center" cursor="pointer">
      <Box mr="1rem">
        <BlockIcon w="1.625rem" h="1.875rem" />
      </Box>
      <Box
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        color={NAMED_COLORS.LIGHT_BLUE}
      >
        {label}
      </Box>
    </Flex>
  )
}

const getOptionLabel = (option: BlockType | TransactionType) =>
  option ? option.hash : ''

const NavSearch: FC<InputProps> = () => {
  const $placeholder = useBreakpointValue({
    base: 'Search by height, hash or txn',
    sm: 'Search',
    xl: 'Search by block height, hash or transaction',
  })
  const [$search, $setSearch] = useState<string>()
  const router = useRouter()

  const { data: searchData, loaded } = useBlocksSearch($search, 5)

  const options = loaded
    ? searchData.data.map(({ label, data }) => ({
        label,
        options: data,
      }))
    : []

  return (
    <SearchAutocomplete<BlockType | TransactionType>
      InputProps={{
        placeholder: $placeholder,
        onChange: e => $setSearch(e.target.value),
      }}
      variant="navSearch"
      inputLeftElement={<SearchIcon />}
      options={options}
      emptyOption="No matches"
      getOptionLabel={getOptionLabel}
      onSelectOption={(option: BlockType | TransactionType) => {
        const isBlockOption = isBlock(option)
        if (isBlockOption && 'sequence' in option) {
          return router.push({
            pathname: RoutePaths.BlockInfo,
            query: { id: option?.sequence },
          })
        } else {
          return router.push({
            pathname: RoutePaths.TransactionInfo,
            query: { hash: option?.hash },
          })
        }
      }}
      renderOption={option => <Option label={getOptionLabel(option)} />}
    />
  )
}

export default NavSearch
