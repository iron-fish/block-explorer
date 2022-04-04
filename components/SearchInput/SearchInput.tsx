import { FC } from 'react';
import { InputGroup, InputLeftElement, Input, InputProps } from '@ironfish/ui-kit';
import { SearchIcon } from 'svgx';

const SearchInput: FC<InputProps> = (props) => {
  return (
    <InputGroup variant={props.variant}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input {...props} />
    </InputGroup>
  );
};

export default SearchInput
