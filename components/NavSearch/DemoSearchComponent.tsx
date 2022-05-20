import {
  FC,
  useState,
  useEffect,
  useRef,
  ReactNode,
  MutableRefObject,
  RefObject,
} from 'react'

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
  useOutsideClick,
  useColorModeValue,
  NAMED_COLORS,
} from '@ironfish/ui-kit'
import { groupBy } from 'ramda'

export type SearchOptionType = {
  id: string | number
  value: string | number
  label: string
  object: string
}

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
  value?: SearchOptionType
  InputProps?: IProps
  options?: SearchOptionType[]
  emptyOption?: ReactNode
  renderOption?: (option: SearchOptionType) => ReactNode
  onSelectOption?: (option: SearchOptionType) => void
  groupOptionsBy?: (option: SearchOptionType) => string
  inputLeftElement?: ReactNode
  variant?: string
  renderGroupTitle?: (title: string) => ReactNode
}

const SearchAutocomplete: FC<SearchAutocompleteProps> = ({
  value = null,
  InputProps = {},
  options = [],
  emptyOption = 'No matches',
  renderOption = option => <Box>{option.label}</Box>,
  onSelectOption = () => void 0,
  groupOptionsBy = option => option.object,
  renderGroupTitle = title => <Text>{title}</Text>,
  inputLeftElement,
  ...props
}) => {
  const [val, setVal] = useState<SearchOptionType | null>(value)
  const [search, setSearch] = useState<string>('')
  const styles = useMultiStyleConfig('SearchAutocomplete', props)
  const inputRef = useRef<HTMLInputElement>()
  const popoverRef = useRef<HTMLDivElement>()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const colors = useColorModeValue(
    {
      popover: NAMED_COLORS.WHITE,
      emptyOption: NAMED_COLORS.GREY,
      optionHover: NAMED_COLORS.LIGHTER_GREY,
    },
    {
      popover: NAMED_COLORS.DARKER_GREY,
      emptyOption: NAMED_COLORS.PALE_GREY,
      optionHover: NAMED_COLORS.DARK_GREY,
    }
  )

  useOutsideClick({
    ref: inputRef,
    handler: onClose,
  })

  useEffect(() => {
    setVal(value)
  }, [value])

  const groupedOptions = groupBy(groupOptionsBy)(options) || []
  const hasOptions = Object.values(groupedOptions).some(
    (groupOptions: SearchOptionType[]) => groupOptions?.length
  )

  const renderGroup = (groupName, groupOptions) => {
    return (
      <>
        {groupName ? (
          <Box
            w="100%"
            sx={{
              padding: '1rem 2rem 0.6875rem',
              fontSize: '0.875rem',
              fontWeight: '400',
              lineHeight: '160%',
            }}
          >
            {renderGroupTitle(groupName)}
          </Box>
        ) : null}
        {groupOptions.map(option => (
          <Box
            w="100%"
            key={option.value}
            sx={{
              padding: '0.5rem 2rem',
              _hover: {
                bg: colors.optionHover,
                transition: 'all 300ms ease-in',
              },
              _last: {
                marginBottom: '1rem',
              },
            }}
            onClick={() => {
              if (val !== option) {
                setVal(option)
                onSelectOption(option)
                setSearch('')
                onClose()
              }
            }}
          >
            {renderOption(option)}
          </Box>
        ))}
      </>
    )
  }

  return (
    <Popover
      matchWidth
      isOpen={isOpen && !!search}
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
            onFocus={e => e.target?.select()}
            onChange={e => {
              if (val) {
                setVal(null)
              }
              setSearch(e.target.value)
              InputProps?.onChange && InputProps.onChange(e)
            }}
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent
        w="inherit"
        sx={{
          borderRadius: '1.875rem',
          bg: colors.popover,
          _focus: {
            boxShadow: 'none',
          },
        }}
        ref={popoverRef as RefObject<HTMLDivElement>}
      >
        <PopoverBody sx={{ padding: '1rem 0' }}>
          {hasOptions ? (
            Object.entries(groupedOptions).map(groupData =>
              renderGroup(...groupData)
            )
          ) : (
            <Box
              w="100%"
              key="empty-option"
              sx={{
                padding: '0 2rem',
                fontSize: '1rem',
                lineHeight: '1.5',
                fontWeight: '400',
                color: colors.emptyOption,
              }}
            >
              {emptyOption}
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default SearchAutocomplete
