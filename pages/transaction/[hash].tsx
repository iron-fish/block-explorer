import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  List,
  ListItem,
  NAMED_COLORS,
  chakra,
  Text,
} from '@ironfish/ui-kit'
import Head from 'next/head'
import { useRouter } from 'next/router'
import size from 'byte-size'
import pathOr from 'ramda/src/pathOr'
import unless from 'ramda/src/unless'
import equals from 'ramda/src/equals'
import pipe from 'ramda/src/pipe'

import { Card, CardContainer, CopyToClipboardButton } from 'components'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import useTransactionByHash from 'hooks/useTransactionByHash'
import {
  DifficultyIcon,
  SecondsToBlockIcon,
  InOutPutsIcon,
  LargeArrowLeftDown,
  LargeArrowRightUp,
  SizeIcon,
  CompassIcon,
} from 'svgx'
import { getIRFAmountWithCurrency } from 'utils/currency'
import { TransactionType } from 'types'
import { truncateHash } from 'utils/hash'
import safeProp from 'utils/safeProp'
import { formatBlockTimestamp } from 'utils/format'

const TransactionDataBlock = ({ label, value, icon }) => {
  const $colors = useColorModeValue(
    { border: NAMED_COLORS.LIGHT_GREY, bg: NAMED_COLORS.WHITE },
    { border: NAMED_COLORS.DARK_GREY, bg: NAMED_COLORS.DARKER_GREY }
  )

  return (
    <Flex
      padding="1.875rem 2rem"
      border={`0.0625rem solid ${$colors.border}`}
      bg={$colors.bg}
      borderRadius="0.25rem"
      boxShadow="0 0.25rem 0.6875rem rgba(0, 0, 0, 0.04)"
      direction="column"
    >
      <Text
        color={NAMED_COLORS.GREY}
        fontSize="0.75rem"
        fontFamily="ABC Favorit Trial"
        display={{ base: 'block', md: 'none' }}
        mb="1rem"
      >
        {label}
      </Text>
      <Flex align="center">
        {icon}
        <chakra.h4
          ml="1rem"
          color={NAMED_COLORS.LIGHT_BLUE}
          overflow="hidden"
          w="100%"
        >
          {value}
        </chakra.h4>
        <CopyToClipboardButton value={value} />
      </Flex>
    </Flex>
  )
}

const EmptyDataBlock = () => {
  const $colors = useColorModeValue(
    { bg: NAMED_COLORS.LIGHTER_GREY, text: NAMED_COLORS.GREY },
    { bg: NAMED_COLORS.DARKER_GREY_1, text: NAMED_COLORS.DARKER_GREY_2 }
  )

  return (
    <Flex
      padding="1.875rem 2rem"
      border={`0.0625rem solid ${$colors.bg}`}
      bg={$colors.bg}
      borderRadius="0.25rem"
      direction="column"
      display={{ base: 'none', md: 'flex' }}
    >
      <Flex align="center">
        <chakra.h4 color={$colors.text} overflow="hidden" w="100%">
          There are no inputs in this transaction
        </chakra.h4>
      </Flex>
    </Flex>
  )
}

const TransactionsDataList = ({ data = [], isInput = true }) => {
  const $label = isInput ? 'INPUTS' : 'OUTPUTS'
  const $hashSize = useBreakpointValue({
    base: 16,
    md: 9,
    lg: 10,
    xl: 12,
    '2xl': 16,
  })
  return (
    <>
      <Text
        color={NAMED_COLORS.GREY}
        fontSize="0.75rem"
        fontFamily="ABC Favorit Trial"
        pl="2rem"
        mb="1rem"
        display={{ base: 'none', md: 'block' }}
      >
        {$label}
      </Text>
      <List w="100%" spacing={'1rem'}>
        {data.length ? (
          data.map((item, index) => (
            <ListItem key={`list-item-${index}`}>
              <TransactionDataBlock
                label={$label}
                value={truncateHash(
                  item[isInput ? 'nullifier' : 'commitment'],
                  2,
                  $hashSize
                )}
                icon={isInput ? <LargeArrowLeftDown /> : <LargeArrowRightUp />}
              />
            </ListItem>
          ))
        ) : (
          <EmptyDataBlock />
        )}
      </List>
    </>
  )
}

const TRANSACTION_INFO_CARDS = [
  {
    key: 'block-hash-card',
    label: 'Block Hash',
    value: (transaction: TransactionType | null) => (
      <Flex align="center">
        {pipe(
          pathOr('', ['blocks', 0, 'hash']),
          unless(equals(''), hash => truncateHash(hash, 2))
        )(transaction)}
        <CopyToClipboardButton value={transaction?.blocks[0]?.hash} />
      </Flex>
    ),
    icon: <DifficultyIcon />,
  },
  {
    key: 'transaction-hash-card',
    label: 'Transaction Hash',
    value: (transaction: TransactionType | null) => (
      <Flex align="center">
        {pipe(
          safeProp('hash'),
          unless(equals(''), hash => truncateHash(hash, 2))
        )(transaction)}
        <CopyToClipboardButton value={transaction?.hash} />
      </Flex>
    ),
    icon: <DifficultyIcon />,
  },
  {
    key: 'size-card',
    label: 'Size',
    value: pipe(safeProp('size'), size, z => z.toString()),
    icon: <SizeIcon />,
  },
  {
    key: 'fee-card',
    label: 'Fee',
    value: pipe(safeProp('fee'), getIRFAmountWithCurrency),
    icon: <CompassIcon />,
  },
  {
    key: 'timestamp-card',
    label: 'Timestamp',
    value: pipe(pathOr({}, ['blocks', 0]), formatBlockTimestamp),
    icon: <SecondsToBlockIcon />,
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
]

const TransactionInfo = ({ data, loaded }) => {
  const $width = useBreakpointValue({
    base: { cardWidth: '100%', listWidth: '100%' },
    sm: { cardWidth: 'calc(50% - 1rem)', listWidth: '100%' },
    md: { cardWidth: 'calc(33.333333% - 1rem)', listWidth: 'calc(50% - 2rem)' },
  })

  return (
    <>
      <Box mt="0.5rem" mb="2rem">
        <h3>Transaction Information</h3>
      </Box>
      <CardContainer>
        {TRANSACTION_INFO_CARDS.map(card => (
          <Card
            key={card.key}
            mb="1rem"
            w={$width.cardWidth}
            label={card.label}
            value={card.value(data)}
            icon={card.icon}
            isLoading={!loaded}
          />
        ))}
      </CardContainer>
      <Box my="2rem">
        <h3>Transactions</h3>
      </Box>
      <Flex w="100%" wrap="wrap" mb="3.5rem">
        <Box
          flex={1}
          w={$width.listWidth}
          mr={{ base: 0, md: '1rem' }}
          mb="1rem"
          display={{ sm: data?.spends.length ? 'block' : 'none', md: 'block' }}
        >
          <TransactionsDataList data={data?.spends} />
        </Box>
        <Box
          flex={1}
          w={$width.listWidth}
          ml={{ base: 0, md: '1rem' }}
          mb="1rem"
          display={{ sm: data?.notes.length ? 'block' : 'none', md: 'block' }}
        >
          <TransactionsDataList data={data?.notes} isInput={false} />
        </Box>
      </Flex>
    </>
  )
}

export default function TransactionInformationPage() {
  const router = useRouter()
  const { hash } = router.query

  const { data, loaded } = useTransactionByHash(hash as string)
  const block = pathOr({}, ['blocks', 0])(data)

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
