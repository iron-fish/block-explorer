import {
  Box,
  Card,
  CardBody,
  Flex,
  NAMED_COLORS,
  Skeleton,
  chakra,
} from '@ironfish/ui-kit'
import { useRouter } from 'next/router'
import HashView from 'components/HashView'
import InfoBadge from 'components/InfoBadge'
import CopyValueToClipboard from 'components/CopyValueToClipboard'
import { ColumnProps } from 'components/Table/types'
import TableCellTimeStamp from 'components/TableCellTimeStamp'
import useAsset from 'hooks/useAsset'
import { AssetType } from 'types'
import { formatNumberWithLanguage } from 'utils/format'
import safeProp from 'utils/safeProp'
import CaretRightIcon from 'icons/CaretRightIcon'
import { FishIcon } from 'svgx'
import RoutePaths from 'constants/RoutePaths'

const COLUMNS: ColumnProps<AssetType>[] = [
  {
    key: 'name',
    label: 'Asset Name',
    render: asset => (
      <Flex alignItems="center">
        <Box
          mr="1rem"
          color={NAMED_COLORS.BLACK}
          _dark={{
            color: NAMED_COLORS.WHITE,
          }}
        >
          <FishIcon pb="0.1rem" h="1.875rem" w="1.625rem" />
          {/* <AssetIcon pb="0.1rem" h="1.875rem" w="1.625rem" /> */}
        </Box>
        <Box>{asset.name}</Box>
      </Flex>
    ),
  },
  {
    key: 'badge',
    label: '',
    render: () => <InfoBadge message="Verified" />,
    WrapperProps: {
      justifyContent: 'flex-end',
    },
  },
  {
    key: 'supply',
    label: 'Supply',
    render: asset => formatNumberWithLanguage(safeProp('supply')(asset)),
  },
  {
    key: 'id',
    label: 'Asset Identifier',
    render: asset => {
      const identifier = safeProp('identifier')(asset)
      return (
        <CopyValueToClipboard
          value={identifier}
          label={<HashView hash={identifier} />}
        />
      )
    },
  },
  {
    key: 'created_at',
    label: 'Created',
    render: item => (
      <Flex>
        <TableCellTimeStamp timestamp={item.created_transaction_timestamp} />
        <CaretRightIcon
          display={{ base: 'none', lg: 'block' }}
          aria-label="actions-cell"
          ml="2rem"
          w={'1.75rem'}
          h={'1.75rem'}
        />
      </Flex>
    ),
  },
]

const NativeAsset = () => {
  const router = useRouter()
  const { data: nativeAsset, loaded } = useAsset(
    '2cfc97ecdf906e864e6d977da500857b925144de637d8b8ad6eaae0cd84f8240'
  )

  return (
    <Skeleton
      variant="ironFish"
      isLoaded={loaded}
      mb="2.125rem"
      minH="7.9375rem"
      w="100%"
    >
      {loaded && (
        <Card
          variant="ironFish"
          borderRadius="0.25rem"
          width="100%"
          transition="all 300ms ease-in-out"
          cursor="pointer"
          sx={{
            '[aria-label="actions-cell"]': {
              transition: 'color 300ms ease-in-out',
              color: NAMED_COLORS.PALE_GREY,
            },
            _hover: {
              borderColor: NAMED_COLORS.DEEP_BLUE,
              _dark: {
                borderColor: NAMED_COLORS.WHITE,
              },
              '[aria-label="actions-cell"]': {
                color: NAMED_COLORS.DEEP_BLUE,
                _dark: {
                  color: NAMED_COLORS.WHITE,
                },
              },
            },
          }}
          onClick={() => {
            router.push({
              pathname: RoutePaths.AssetsInfo,
              query: {
                id: nativeAsset.identifier,
              },
            })
          }}
        >
          <CardBody width="100%">
            <Flex
              padding="2rem"
              width="100%"
              gap="2rem"
              flexWrap="wrap"
              justifyContent={{ base: 'initial', lg: 'space-between' }}
            >
              {COLUMNS.map(column => (
                <Flex
                  direction="column"
                  key={column.key}
                  {...column.WrapperProps}
                >
                  <chakra.h6
                    color={NAMED_COLORS.GREY}
                    _dark={{
                      color: NAMED_COLORS.PALE_GREY,
                    }}
                    textTransform="uppercase"
                    mb="16px"
                  >
                    {column.label}
                  </chakra.h6>
                  <Box>{column.render(nativeAsset)}</Box>
                </Flex>
              ))}
            </Flex>
          </CardBody>
        </Card>
      )}
    </Skeleton>
  )
}

export default NativeAsset
