import { FC } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputProps,
  useBreakpointValue
} from "@ironfish/ui-kit";
import { SearchIcon } from "svgx";

const SearchInput: FC<InputProps> = () => {
  const shortSearchPlaceHolder = "Search";
  const longSearchPlaceHolder = "Search by block height, hash or transaction";
  const placeholder = useBreakpointValue({
    base: longSearchPlaceHolder,
    sm: shortSearchPlaceHolder,
    xl: longSearchPlaceHolder,
  });

  return (
    <InputGroup variant="nav_search" >
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder={placeholder}/>
    </InputGroup>
  );
};

export default SearchInput;
