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

export type OptionType = {
  value: string | number;
  label: string | ReactNode;
};

interface SearchAutocompleteProps {
  value?: OptionType;
  InputProps?: IProps;
  options?: OptionType[];
  emptyOption?: ReactNode;
  renderOption?: (option: OptionType) => ReactNode;
  onSelectOption?: (option: OptionType) => void;
  groupOptionsBy: () => string;
  inputLeftElement?: ReactNode;
  variant?: string;
  renderGroupTitle?: ReactNode;
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
  const [val, setVal] = useState<OptionType | null>(value);
  const [search, setSearch] = useState<string>("");
  const styles = useMultiStyleConfig("SearchAutocomplete", props);
  const inputRef = useRef<HTMLInputElement>();
  const popoverRef = useRef<HTMLDivElement>();
  const { onOpen, onClose, isOpen } = useDisclosure();

  useOutsideClick({
    ref: useMergeRefs(inputRef, popoverRef),
    handler: onClose,
  });

  useEffect(() => {
    setVal(value);
  }, [value]);

  const groupedOptions = groupBy(groupOptionsBy)(options);
  const hasOptions = Object.values(groupedOptions).some(
    (groupOptions) => groupOptions.length
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
