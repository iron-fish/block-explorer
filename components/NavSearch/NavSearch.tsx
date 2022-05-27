import { FC, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputProps,
  useBreakpointValue,
  Flex,
  Box,
  NAMED_COLORS,
  SearchAutocomplete,
} from "@ironfish/ui-kit";

import { truncateHash } from "utils/hash";
import { SearchIcon } from "svgx";
import useBlocksSearch from "hooks/useBlocksSearch";
import { BlockType, TransactionType, isBlock } from "types";
import BlockIcon from "icons/BlockIcon";
import RoutePaths from "constants/RoutePaths";
import { useRouter } from 'next/router'

const makeSearchOption = ({ id, hash, ...rest }) => ({
  label: `${id} - ${hash}`,
  value: hash,
  ...rest
});

interface OptionProps {
  label: string;
}

const Option: FC<OptionProps> = ({ label }) => {
  return (
    <Flex minH="1.875rem" alignItems="center">
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
  );
};

const SearchInput: FC<InputProps> = () => {
  const shortSearchPlaceHolder = "Search";
  const longSearchPlaceHolder = "Search by block height, hash or transaction";
  const $placeholder = useBreakpointValue({
    base: longSearchPlaceHolder,
    sm: shortSearchPlaceHolder,
    xl: longSearchPlaceHolder,
  });
  const [$search, $setSearch] = useState<string>();
  const router = useRouter()

  const { data, loaded } = useBlocksSearch($search, 5);

  const options = loaded
    ? data.data.map(({ label, data }) => ({
        label,
        options: data.map(makeSearchOption),
      }))
    : [];

  return (
    <SearchAutocomplete
      InputProps={{
        placeholder: $placeholder,
        onChange: (e) => $setSearch(e.target.value),
      }}
      variant="navSearch"
      inputLeftElement={() => <SearchIcon />}
      options={options}
      onSelectOption={option => {
        const isBlockOption = isBlock(option)
        return router.push({
          pathname: isBlockOption ? RoutePaths.BlockDetail : RoutePaths.TransactionInfo,
          query: isBlockOption ? { id: option?.sequence } : { hash: option?.hash },
        })
      }}
      renderOption={(option) => <Option {...option} />}
    />
  );
};

export default SearchInput;
