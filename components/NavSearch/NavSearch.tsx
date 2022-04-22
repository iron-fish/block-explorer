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
} from "@ironfish/ui-kit";
import DemoSearchComponent from "./DemoSearchComponent";
import { truncateHash } from "utils/hash";
import { SearchIcon, RedditIcon } from "svgx";
import useBlocksSearch from "hooks/useBlocksSearch";

const Option: FC<OptionType> = ({ id, value }) => {
  const hashValue = useBreakpointValue({
    base: truncateHash(value, 2),
    sm: truncateHash(value, 4),
    md: value,
  });
  return (
    <Flex minH="30px" alignItems="center">
      <Box mr="16px">
        <RedditIcon />
      </Box>
      <Box
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        color={NAMED_COLORS.LIGHT_BLUE}
      >
        {id} - {hashValue}
      </Box>
    </Flex>
  );
};

function isBlock(x: unknown): x is Block {
  return typeof x === 'object' && !!x && 'transactions' in x && !('block' in x)
}

const groupOptionsBy = (option) => {
  if (!option) {
    return "";
  }

  if (isBlock(option)) {
    return "Blocks";
  }

  return "Transactions";
};

const SearchInput: FC<InputProps> = () => {
  const shortSearchPlaceHolder = "Search";
  const longSearchPlaceHolder = "Search by block height, hash or transaction";
  const placeholder = useBreakpointValue({
    base: longSearchPlaceHolder,
    sm: shortSearchPlaceHolder,
    xl: longSearchPlaceHolder,
  });

  const [search, setSearch] = useState();

  const { data } = useBlocksSearch({ search });

  return (
    <DemoSearchComponent
      variant="nav_search"
      InputProps={{
        placeholder,
        onChange: e => setSearch(e.target.value),
      }}
      inputLeftElement={<SearchIcon />}
      options={data?.data.map(item => ({ label: `${item.id} - ${item.hash}`, value: item.hash, ...item }))}
      renderOption={(option) => <Option {...option} />}
      groupOptionsBy={groupOptionsBy}
    />
  );
};

export default SearchInput;
