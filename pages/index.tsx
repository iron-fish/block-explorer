import {
  Flex,
  Box,
  HStack,
  Button,
  Center,
  NAMED_COLORS,
  Text,
  useColorModeValue,
} from '@ironfish/ui-kit'
import Head from 'next/head'

import { Card, CardContainer, BlocksTable } from 'components'
import RoutePaths from 'constants/RoutePaths'
import useBlockHead from 'hooks/useBlockHead'
import { useTranslation } from 'hooks/useTranslation'
import useBlocks from 'hooks/useBlocks'
import { truncateHash } from 'utils/hash'
import { Translator } from 'types/common'

import {
  HeightIcon,
  DifficultyIcon,
  LatestBlockHashIcon,
  LatestBlockTXNIcon,
  SecondsToBlockIcon,
  TotalSupplyIcon,
} from 'svgx'
import NextLink from 'next/link'
import { BlockType } from 'types'

const BLOCKS_LIMIT = 10
const getBlockInfo = (t: Translator) => [
  {
    key: 'difficulty-card',
    label: t('info-card-difficulty'),
    value: (block: BlockType | null) => block?.difficulty,
    icon: <DifficultyIcon />,
  },
  {
    key: 'height-card',
    label: t('info-card-height'),
    value: (block: BlockType | null) => block?.sequence,
    icon: <HeightIcon />,
  },
  {
    key: 'hash-card',
    label: t('info-card-latest'),
    value: (block: BlockType | null) => truncateHash(block?.hash),
    icon: <LatestBlockHashIcon />,
  },
  {
    key: 'txn-card',
    label: t('info-card-txn'),
    value: (block: BlockType | null) => block?.transactions_count,
    icon: <LatestBlockTXNIcon />,
  },
  {
    key: 'interval-card',
    label: t('info-card-seconds'),
    value: (block: BlockType | null) =>
      Math.floor(block?.time_since_last_block_ms / 1000),
    icon: <SecondsToBlockIcon />,
  },
  {
    key: 'supply-card',
    label: t('info-card-supply'),
    value: () => '-',
    icon: <TotalSupplyIcon />,
  },
]

const LastBlockInfo = () => {
  const { t } = useTranslation(['p-index', 'c-blockstable', 'c-navlistoflinks'])
  const $cardWidth = useBreakpointValue({
    base: '100%',
    sm: 'calc(50% - 1rem)',
    md: 'calc(33.333333333% - 1rem)',
  })
  const $headBlock = useBlockHead()

  return (
    <CardContainer>
      {getBlockInfo(t).map(data => (
        <Card
          key={data.key}
          mb="1rem"
          width={{
            base: 'max(20rem, 100% - 0.5rem)',
            md: 'max(20rem, 50% - 1rem)',
            '2xl': 'max(20rem, 33.333333% - 1rem)',
          }}
          label={data.label}
          value={data.value($headBlock.data)}
          icon={data.icon}
          isLoading={!$headBlock.loaded}
        />
      ))}
    </CardContainer>
  )
}

const LatestBlocks = () => {
  const { t } = useTranslation(['p-index', 'c-blockstable', 'c-navlistoflinks'])
  const $blocks = useBlocks({
    limit: BLOCKS_LIMIT,
    main: true,
  })

  return (
    <Flex direction="column" mb="2rem">
      <Text fontSize="1.5rem" mb="0.625rem">
        {t('info-subtitle')}
      </Text>
      {!$blocks.error ? (
        <BlocksTable
          data={
            $blocks.loaded ? $blocks.data : new Array(BLOCKS_LIMIT).fill(null)
          }
        />
      ) : (
        <Card
          w="100%"
          label="Something went wrong."
          color="red"
          icon={
            <Box
              border="0.125rem solid red"
              fontSize="1.5rem"
              fontWeight="bold"
              borderRadius="50%"
              w="2.5rem"
              h="2.5rem"
              textAlign="center"
            >
              !
            </Box>
          }
        />
      )}
    </Flex>
  )
}

export default function Home() {
  const { t } = useTranslation(['p-index', 'c-blockstable', 'c-navlistoflinks'])
  const $colors = useColorModeValue(
    {
      imageBg: '#1b006a',
      bgImage: `url('/images/home_page_logo_purple.png')`,
      mainBg: NAMED_COLORS.WHITE,
    },
    {
      imageBg: NAMED_COLORS.BLACK,
      bgImage: `url('/images/home_page_logo_black.png')`,
      mainBg: NAMED_COLORS.LIGHT_BLACK,
    }
  )

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>{t('meta-title')}</title>
      </Head>
      <Box
        sx={{
          h: { base: '35.5rem', sm: '33.75rem' },
          w: '100%',
          bgColor: $colors.imageBg,
          bgImage: { base: null, sm: $colors.bgImage },
          bgRepeat: 'no-repeat',
          pos: 'absolute',
          backgroundPositionX: 'right',
          backgroundSize: '55.9375rem',
        }}
      />
      <Flex
        justify="center"
        pt={{ base: '6rem', sm: '7.5rem' }}
        pb="6rem"
        bgColor={$colors.mainBg}
      >
        <Box mx={{ base: '2rem', lg: '15%' }} w="100%" zIndex={1}>
          <Flex direction="column" mb="5.3125rem">
            <Text
              fontSize="3.25rem"
              lineHeight="3.8675rem"
              color={NAMED_COLORS.WHITE}
              mb="1.125rem"
              fontFamily="extended-regular"
            >
              {t('info-title__1')}
              <br />
              {t('info-title__2')}
            </Text>
            <Text fontSize="1.5rem" mb="2.25rem" color={NAMED_COLORS.WHITE}>
              {t('info-stats')}
            </Text>
            <HStack>
              <NextLink href={RoutePaths.Explorer} passHref>
                <Button variant="secondary" size="medium">
                  {t('cta-all-blocks')}
                </Button>
              </NextLink>
              <Button variant="secondary" size="medium">
                {t('cta-chain-explorer')}
              </Button>
            </HStack>
          </Flex>
          <LastBlockInfo />
          <NextLink href={RoutePaths.Charts} passHref>
            <Button variant="secondary" size="medium" mb="6rem">
              {t('cta-charts')}
            </Button>
          </NextLink>
          <LatestBlocks />
          <Center>
            <NextLink href={RoutePaths.Explorer} passHref>
              <Button variant="secondary" size="medium">
                {t('cta-all-blocks')}
              </Button>
            </NextLink>
          </Center>
        </Box>
      </Flex>
    </main>
  )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
