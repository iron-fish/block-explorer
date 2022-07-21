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
  FONTS,
} from '@ironfish/ui-kit'
import Head from 'next/head'
import { useRouter } from 'next/router'
import size from 'byte-size'
import pathOr from 'ramda/src/pathOr'
import pipe from 'ramda/src/pipe'

import { Card, CardContainer, CopyValueToClipboard } from 'components'
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
import { TransactionType } from 'types'
import { truncateHash } from 'utils/hash'
import safeProp from 'utils/safeProp'
import { formatBlockTimestamp } from 'utils/format'

const TransactionDataBlock = ({ label, value, icon }) => {
  const $colors = useColorModeValue(
    { border: NAMED_COLORS.LIGHT_GREY, bg: NAMED_COLORS.WHITE },
    { border: NAMED_COLORS.DARK_GREY, bg: NAMED_COLORS.DARKER_GREY }
  )

  const $hashSize = useBreakpointValue({
    base: 12,
    sm: 16,
    md: 9,
    lg: 10,
    xl: 12,
    '2xl': 16,
  })

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
        fontFamily={FONTS.FAVORIT}
        display={{ base: 'block', md: 'none' }}
        mb="1rem"
      >
        {label}
      </Text>
      <Flex align="center">
        {icon}
        <CopyValueToClipboard
          labelProps={{
            wordBreak: { base: 'break-word', sm: 'unset' },
            ml: '1rem',
            color: NAMED_COLORS.LIGHT_BLUE,
            overflow: 'hidden',
            w: '100%',
          }}
          value={value}
          label={truncateHash(value, 2, $hashSize)}
        />
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

  return (
    <Box
      flex={1}
      w={{ base: '100%', md: 'calc(50% - 2rem)' }}
      mr={{ base: 0, md: '1rem' }}
      mb="1rem"
      display={{ base: data?.length ? 'block' : 'none', md: 'block' }}
    >
      <Text
        color={NAMED_COLORS.GREY}
        fontSize="0.75rem"
        fontFamily={FONTS.FAVORIT}
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
                value={item[isInput ? 'nullifier' : 'commitment']}
                icon={isInput ? <LargeArrowLeftDown /> : <LargeArrowRightUp />}
              />
            </ListItem>
          ))
        ) : (
          <EmptyDataBlock />
        )}
      </List>
    </Box>
  )
}

const TRANSACTION_INFO_CARDS = [
  {
    key: 'block-hash-card',
    label: 'Block Hash',
    value: (transaction: TransactionType | null) => {
      const hash = pathOr('', ['blocks', 0, 'hash'])(transaction)
      return <CopyValueToClipboard value={hash} label={truncateHash(hash, 2)} />
    },
    icon: <DifficultyIcon />,
  },
  {
    key: 'transaction-hash-card',
    label: 'Transaction Hash',
    value: (transaction: TransactionType | null) => {
      const hash = safeProp('hash')(transaction)
      return <CopyValueToClipboard value={hash} label={truncateHash(hash, 2)} />
    },
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
]

const TransactionInfo = ({ data, loaded }) => {
  const $subTextColor = useColorModeValue(
    NAMED_COLORS.GREY,
    NAMED_COLORS.PALE_GREY
  )
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
            width={{
              base: 'max(20rem, 100% - 0.5rem)',
              md: 'max(20rem, 50% - 1rem)',
              '2xl': 'max(20rem, 33.333333% - 1rem)',
            }}
            label={card.label}
            value={card.value(data)}
            icon={card.icon}
            isLoading={!loaded}
          />
        ))}
      </CardContainer>
      <Box mt="2rem" mb="0.5rem">
        <h3>Inputs / Outputs</h3>
      </Box>
      <Text as="h4" color={$subTextColor} mb="2rem">
        Your transaction details are hidden because $IRON is a privacy chain
      </Text>
      <Flex
        w="100%"
        wrap="wrap"
        direction={{ base: 'column', md: 'row' }}
        mb="3.5rem"
      >
        <TransactionsDataList data={data?.spends} />
        <TransactionsDataList data={data?.notes} isInput={false} />
      </Flex>
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
