import {
  FC,
  useState,
  useEffect,
  useRef,
  ReactNode,
  MutableRefObject,
  RefObject,
} from "react";

import {
  Box,
  Input,
  InputProps as IProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useMultiStyleConfig,
  InputGroup,
  InputLeftElement,
  Text,
  useMergeRefs,
  useOutsideClick,
} from "@ironfish/ui-kit";
import { groupBy } from "ramda";

export type SearchOptionType = {
  id: string | number
  value: string | number
  label: string
  object: string
};

/**
 * ------------------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------------------
 * This component is a mock up of implementation in UI kit and must be replaced
 * ------------------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------------------
 */

interface SearchAutocompleteProps {
  value?: SearchOptionType;
  InputProps?: IProps;
  options?: SearchOptionType[];
  emptyOption?: ReactNode;
  renderOption?: (option: SearchOptionType) => ReactNode;
  onSelectOption?: (option: SearchOptionType) => void;
  groupOptionsBy?: (option: SearchOptionType) => string;
  inputLeftElement?: ReactNode;
  variant?: string;
  renderGroupTitle?: (title: string) => ReactNode;
}

const SearchAutocomplete: FC<SearchAutocompleteProps> = ({
  value = null,
  InputProps = {},
  options = [],
  emptyOption = "No matches",
  renderOption = (option) => <Box>{option.label}</Box>,
  onSelectOption = () => void 0,
  groupOptionsBy = (option) => option.object,
  renderGroupTitle = (title) => <Text>{title}</Text>,
  inputLeftElement,
  ...props
}) => {
  const [val, setVal] = useState<SearchOptionType | null>(value);
  const [search, setSearch] = useState<string>("");
  const styles = useMultiStyleConfig("SearchAutocomplete", props);
  const inputRef = useRef<HTMLInputElement>();
  const popoverRef = useRef<HTMLDivElement>();
  const { onOpen, onClose, isOpen } = useDisclosure();

  useOutsideClick({
    ref: inputRef,
    handler: onClose,
  });

  useEffect(() => {
    setVal(value);
  }, [value]);

  const groupedOptions = groupBy(groupOptionsBy)(options) || [];
  const hasOptions = Object.values(groupedOptions).some(
    (groupOptions: SearchOptionType[]) => groupOptions?.length
  );

  const renderGroup = (groupName, groupOptions) => {
    return (
      <>
        {groupName ? (
          <Box w="100%" sx={styles?.groupTitleWrapper}>
            {renderGroupTitle(groupName)}
          </Box>
        ) : null}
        {groupOptions.map((option) => (
          <Box
            w="100%"
            key={option.value}
            sx={styles?.groupOptionWrapper}
            onClick={() => {
              if (val !== option) {
                setVal(option);
                onSelectOption(option);
                onClose();
              }
            }}
          >
            {renderOption(option)}
          </Box>
        ))}
      </>
    );
  };

  return (
    <Popover
      matchWidth
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
      closeOnEsc
      initialFocusRef={inputRef as RefObject<HTMLInputElement>}
      offset={[0, 15]}
      placement="bottom"
    >
      <PopoverTrigger>
        <InputGroup variant={props.variant || InputProps.variant}>
          {inputLeftElement ? (
            <InputLeftElement pointerEvents="none">
              {inputLeftElement}
            </InputLeftElement>
          ) : null}
          <Input
            {...InputProps}
            value={val ? val.label : search}
            ref={inputRef as RefObject<HTMLInputElement>}
            onFocus={(e) => e.target?.select()}
            onChange={(e) => {
              if (val) {
                setVal(null);
              }
              setSearch(e.target.value);
              InputProps?.onChange && InputProps.onChange(e);
            }}
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent
        w="100%"
        sx={styles?.popover}
        ref={popoverRef as RefObject<HTMLDivElement>}
      >
        <PopoverBody sx={styles?.popoverBody}>
          {hasOptions ? (
            Object.entries(groupedOptions).map((groupData) =>
              renderGroup(...groupData)
            )
          ) : (
            <Box w="100%" key="empty-option" sx={styles?.emptyOption}>
              {emptyOption}
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchAutocomplete;
