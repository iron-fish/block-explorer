import { useMemo, useState, FC } from 'react'
import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  NAMED_COLORS,
  chakra,
  Text,
  Button,
  HStack,
  VStack,
  TableProps,
} from '@ironfish/ui-kit'
import Head from 'next/head'
import { useRouter } from 'next/router'
import size from 'byte-size'
import { pathOr, pipe } from 'ramda'

import {
  Card,
  CardContainer,
  CopyValueToClipboard,
  InfoBadge,
  HashView,
} from 'components'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import useTransactionByHash from 'hooks/useTransactionByHash'
import {
  DifficultyIcon,
  BlockInfoTimestampIcon,
  InOutPutsIcon,
  LargeArrowLeftDown,
  LargeArrowRightUp,
  SizeIcon,
  CompassIcon,
} from 'svgx'
import { getIRFAmountWithCurrency } from 'utils/currency'
import { NoteType, SpendType, TransactionType } from 'types'
import safeProp from 'utils/safeProp'
import { formatBlockTimestamp } from 'utils/format'
import {
  MintsBurnsList,
  EmptyMintsBurnsBlock,
} from 'components/CustomAssets/MintsBurnsList/MintsBurnsList'
import ColumnTable from 'components/ColumnTable'

type TransactionDescriptionType = 'inputs' | 'outputs'

const EmptyInputsOutPutsBlock = ({
  type,
}: {
  type: TransactionDescriptionType
}) => {
  const $colors = useColorModeValue(
    { bg: NAMED_COLORS.LIGHTER_GREY, text: NAMED_COLORS.GREY },
    { bg: NAMED_COLORS.DARKER_GREY_1, text: NAMED_COLORS.DARKER_GREY_2 }
  )

  return (
    <Flex
      padding="1.75rem 2rem"
      border={`0.0625rem solid ${$colors.bg}`}
      bg={$colors.bg}
      borderRadius="0.25rem"
      direction="column"
      display={{ base: 'none', md: 'flex' }}
    >
      <Flex align="center">
        <chakra.h4 color={$colors.text} overflow="hidden" w="100%">
          There are no {type} in this transaction
        </chakra.h4>
      </Flex>
    </Flex>
  )
}

interface TransactionsDataListProps extends TableProps {
  data: Array<NoteType | SpendType>
  type: TransactionDescriptionType
}

const TransactionsDataList: FC<TransactionsDataListProps> = ({
  data = [],
  type,
  ...rest
}) => {
  const hashSize = useBreakpointValue({
    base: 12,
    sm: 16,
    md: 9,
    lg: 10,
    xl: 12,
    '2xl': 16,
  })

  const columns = useMemo(
    () => [
      {
        key: `column-${type}`,
        label: type,
        render: function Render(item) {
          const value = item[type === 'inputs' ? 'nullifier' : 'commitment']
          return (
            <Flex align="center">
              {type === 'inputs' ? (
                <LargeArrowLeftDown />
              ) : (
                <LargeArrowRightUp />
              )}
              <CopyValueToClipboard
                labelProps={{
                  wordBreak: { base: 'break-word', sm: 'unset' },
                  ml: '1rem',
                  overflow: 'hidden',
                  w: '100%',
                }}
                value={value}
                label={<HashView hash={value} parts={2} chars={hashSize} />}
              />
            </Flex>
          )
        },
      },
    ],
    [type, hashSize]
  )

  return (
    <ColumnTable
      data={data}
      columns={columns}
      emptyComponent={<EmptyInputsOutPutsBlock type={type} />}
      {...rest}
    />
  )
}

const TRANSACTION_INFO_CARDS = [
  {
    key: 'block-hash-card',
    label: 'Block Hash',
    value: (transaction: TransactionType | null) => {
      const index = transaction?.blocks.findIndex(block => block.main === true)
      const hash = pathOr('', [
        'blocks',
        index === undefined || index === -1 ? 0 : index,
        'hash',
      ])(transaction)
      return (
        <CopyValueToClipboard
          value={hash}
          label={<HashView hash={hash} parts={2} />}
        />
      )
    },
    icon: <DifficultyIcon />,
  },
  {
    key: 'transaction-hash-card',
    label: 'Transaction Hash',
    value: (transaction: TransactionType | null) => {
      const hash = safeProp('hash')(transaction)
      return (
        <CopyValueToClipboard
          value={hash}
          label={<HashView hash={hash} parts={2} />}
        />
      )
    },
    icon: <DifficultyIcon />,
  },
  {
    key: 'size-card',
    label: 'Size',
    value: pipe(safeProp('size'), x => size(x, { precision: 2 }).toString()),
    icon: <SizeIcon />,
  },
  {
    key: 'fee-card',
    label: 'Reward',
    value: pipe(safeProp('fee'), getIRFAmountWithCurrency),
    icon: <CompassIcon />,
  },
  {
    key: 'timestamp-card',
    label: 'Timestamp',
    value: pipe(pathOr({}, ['blocks', 0]), formatBlockTimestamp),
    icon: <BlockInfoTimestampIcon />,
  },
  {
    key: 'inputs-outputs-card',
    label: 'Inputs / Outputs',
    value: (transaction: TransactionType) =>
      `${pathOr(0, ['spends', 'length'])(transaction)} / ${pathOr(0, [
        'notes',
        'length',
      ])(transaction)}`,
    icon: <InOutPutsIcon />,
  },
  {
    key: 'mints-card',
    label: 'Mints',
    value: item => item?.mints.length || null,
    icon: <BlockInfoTimestampIcon />,
  },
  {
    key: 'burns-card',
    label: 'Burns',
    value: item => item?.burns.length || null,
    icon: <BlockInfoTimestampIcon />,
  },
]

interface TransactionInfoProps {
  data: TransactionType
  loaded: boolean
}

const TransactionInfo: FC<TransactionInfoProps> = ({ data, loaded }) => {
  const $subTextColor = useColorModeValue(
    NAMED_COLORS.GREY,
    NAMED_COLORS.PALE_GREY
  )

  const [showMore, setShowMore] = useState(false)
  const showMoreLimit = 3
  const hasMore = useMemo(() => {
    return (
      data?.spends?.length > showMoreLimit ||
      data?.notes?.length > showMoreLimit
    )
  }, [data?.notes?.length, data?.spends?.length])

  return (
    <>
      <Flex mt="0.5rem" mb="2rem" align="center">
        <h3>Transaction Information</h3>
        {data?.blocks?.every(block => block.main === false) && (
          <InfoBadge ml={'1rem'} message={'Forked'} />
        )}
      </Flex>
      <CardContainer>
        {TRANSACTION_INFO_CARDS.map(card => {
          const value = card.value(data)
          return (
            !!value && (
              <Card
                key={card.key}
                mb="1rem"
                width={{
                  base: 'max(20rem, 100% - 0.5rem)',
                  md: 'max(20rem, 50% - 1rem)',
                  '2xl': 'max(20rem, 33.333333% - 1rem)',
                }}
                label={card.label}
                value={value}
                icon={card.icon}
                isLoading={!loaded}
              />
            )
          )
        })}
      </CardContainer>
      <Box mt="2rem" mb="0.5rem">
        <h3>Inputs / Outputs</h3>
      </Box>
      <Text as="h4" color={$subTextColor} mb="1rem">
        Your transaction details are hidden because $IRON is a privacy chain
      </Text>
      <VStack mb="3.5rem" gap="1rem">
        <Flex
          w="100%"
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: 0, md: '1.75rem' }}
        >
          <TransactionsDataList
            data={
              showMore ? data?.spends : data?.spends?.slice(0, showMoreLimit)
            }
            type="inputs"
            mb={{ base: '-2rem', md: 0 }}
          />
          <TransactionsDataList
            data={showMore ? data?.notes : data?.notes?.slice(0, showMoreLimit)}
            type="outputs"
          />
        </Flex>
        {!showMore && hasMore && (
          <HStack justify="center">
            <Button
              variant="secondary"
              size="medium"
              onClick={() => setShowMore(true)}
            >
              Show More
            </Button>
          </HStack>
        )}
      </VStack>
      <Box mt="2rem" mb="0.5rem">
        <h3>Mints / Burns</h3>
      </Box>
      <Flex
        w="100%"
        justifyContent="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: 0, md: '1.75rem' }}
      >
        <MintsBurnsList
          type="mints"
          data={data?.mints || []}
          mb={{ base: '-1rem', md: 0 }}
        />
        <MintsBurnsList type="burns" data={data?.burns || []} />
      </Flex>
      {!data?.burns.length && !data?.mints.length && (
        <EmptyMintsBurnsBlock
          mt="2rem"
          display={{ base: 'flex', md: 'none' }}
          type="mints or burns"
        />
      )}
    </>
  )
}

export default function TransactionInformationPage() {
  const router = useRouter()
  const { hash } = router.query

  const { data, loaded, error } = useTransactionByHash(hash as string)
  const block = pathOr({}, ['blocks', 0])(data)

  if (error) {
    throw error
  }

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Transaction {hash}</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }} mb="6rem" zIndex={1}>
        <Box mt="2.5rem">
          <Breadcrumbs queryParams={{ id: block.sequence }} />
        </Box>
        <TransactionInfo data={data} loaded={loaded} />
      </Box>
    </main>
  )
}
