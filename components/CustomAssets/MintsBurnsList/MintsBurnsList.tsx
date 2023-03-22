import {
  NAMED_COLORS,
  Flex,
  useColorModeValue,
  chakra,
  FlexProps,
  TableProps,
} from '@ironfish/ui-kit'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import AssetIcon from 'icons/AssetIcon'
import CaretRightIcon from 'icons/CaretRightIcon'
import { AssetDescriptionType } from 'types'
import ColumnTable from 'components/ColumnTable'
import RoutePaths from 'constants/RoutePaths'

type DescriptionType = 'mints' | 'burns' | 'mints or burns'

interface MintsBurnsListProps extends TableProps {
  type: DescriptionType
  data: Array<AssetDescriptionType>
}

export function MintsBurnsList({ type, data, ...rest }: MintsBurnsListProps) {
  const router = useRouter()
  const columns = useMemo(
    () => [
      {
        key: `column-${type}`,
        label: type,
        render: item => {
          return (
            <Flex
              align="center"
              wordBreak={{ base: 'unset', md: 'break-all', lg1: 'unset' }}
            >
              <AssetIcon w={7} h={7} mr="1rem" />
              {item.asset.name}
            </Flex>
          )
        },
      },
      ...(data.length
        ? [
            {
              key: `column-${type}-quantity`,
              label: 'Quantity',
              render: item => {
                return (
                  <Flex
                    h="1.75rem"
                    align="center"
                    wordBreak={{ base: 'unset', md: 'break-all', lg1: 'unset' }}
                  >
                    {item.value}
                  </Flex>
                )
              },
            },
          ]
        : []),
      {
        key: `column-${type}-details`,
        label: '',
        WrapperProps: {
          width: 'min-content',
          alignSelf: 'center',
        },
        render: () => (
          <Flex justify={'center'}>
            <CaretRightIcon
              aria-label="item-details"
              mr="-0.75rem"
              ml="-0.625rem"
              w={'1.75rem'}
              h={'1.75rem'}
            />
          </Flex>
        ),
      },
    ],
    [type, data.length]
  )

  const colors = useColorModeValue(
    {
      hoverBorder: NAMED_COLORS.DEEP_BLUE,
      caretColor: NAMED_COLORS.PALE_GREY,
    },
    {
      hoverBorder: NAMED_COLORS.WHITE,
      caretColor: NAMED_COLORS.PALE_GREY,
    }
  )

  return (
    <ColumnTable
      data={data}
      columns={columns}
      emptyComponent={<EmptyMintsBurnsBlock type={type} />}
      onRowClick={item =>
        router.push({
          pathname: RoutePaths.AssetsInfo,
          query: { id: item.asset.identifier },
        })
      }
      {...rest}
      sx={{
        tr: {
          '[aria-label="item-details"]': {
            transition: 'color 300ms ease-in-out',
            color: colors.caretColor,
          },
          _hover: {
            '[aria-label="item-details"]': {
              color: colors.hoverBorder,
            },
          },
        },
      }}
    />
  )
}

interface EmptyMintsBurnsBlockProps extends FlexProps {
  type: DescriptionType
}

export function EmptyMintsBurnsBlock({
  type,
  ...rest
}: EmptyMintsBurnsBlockProps) {
  const $colors = useColorModeValue(
    { bg: NAMED_COLORS.LIGHTER_GREY, text: NAMED_COLORS.GREY },
    { bg: NAMED_COLORS.DARKER_GREY_1, text: NAMED_COLORS.DARKER_GREY_2 }
  )

  return (
    <Flex
      w="100%"
      padding="1.75rem 2rem"
      border={`0.0625rem solid ${$colors.bg}`}
      bg={$colors.bg}
      borderRadius="0.25rem"
      direction="column"
      display={{ base: 'none', md: 'flex' }}
      {...rest}
    >
      <Flex align="center">
        <chakra.h4 color={$colors.text} overflow="hidden" w="100%">
          There are no {type} in this transaction
        </chakra.h4>
      </Flex>
    </Flex>
  )
}
