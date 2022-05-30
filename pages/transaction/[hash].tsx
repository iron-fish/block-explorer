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
      padding="30px 32px"
      border={`1px solid ${$colors.border}`}
      bg={$colors.bg}
      borderRadius="4px"
      boxShadow="0px 4px 11px rgba(0, 0, 0, 0.04)"
      direction="column"
    >
      <Text
        color={NAMED_COLORS.GREY}
        fontSize="12px"
        fontFamily="ABC Favorit Trial"
        display={{ base: 'block', md: 'none' }}
        mb="16px"
      >
        {label}
      </Text>
      <Flex align="center">
        {icon}
        <chakra.h4
          ml="16px"
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
    { bg: NAMED_COLORS.LIGHT_GREY, text: NAMED_COLORS.GREY },
    { bg: NAMED_COLORS.DARKER_GREY_1, text: NAMED_COLORS.DARKER_GREY_2 }
  )

  return (
    <Flex
      padding="30px 32px"
      border={`1px solid ${$colors.bg}`}
      bg={$colors.bg}
      borderRadius="4px"
      direction="column"
      display={{ base: 'none', md: 'flex' }}
    >
      <Flex align="center">
        <chakra.h4 ml="16px" color={$colors.text} overflow="hidden" w="100%">
          There are no input in this transaction
        </chakra.h4>
      </Flex>
    </Flex>
  )
}

const TransactionsDataList = ({ data = [], isInput = true }) => {
  const $label = isInput ? 'INPUTS' : 'OUTPUTS'
  return (
    <>
      <Text
        color={NAMED_COLORS.GREY}
        fontSize="12px"
        fontFamily="ABC Favorit Trial"
        pl="32px"
        mb="16px"
        display={{ base: 'none', md: 'block' }}
      >
        {$label}
      </Text>
      <List w="100%" spacing={'16px'}>
        {data.length ? (
          data.map((item, index) => (
            <ListItem key={`list-item-${index}`}>
              <TransactionDataBlock
                label={$label}
                value={truncateHash(
                  item[isInput ? 'nullifier' : 'commitment'],
                  2,
                  16
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
        <Box w={$width.listWidth} mr={{ base: 0, md: '16px' }} mb="16px">
          <TransactionsDataList data={data?.spends} />
        </Box>
        <Box w={$width.listWidth} ml={{ base: 0, md: '16px' }} mb="16px">
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