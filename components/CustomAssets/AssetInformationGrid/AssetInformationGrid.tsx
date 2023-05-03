import { Box, NAMED_COLORS, Text } from '@ironfish/ui-kit'
import { Card, CardContainer, CopyValueToClipboard, HashView } from 'components'
import safeProp from 'utils/safeProp'
import { DifficultyIcon, SupplyIcon } from 'svgx'

import NameTag from 'assets/svg/name-tag.svg'
import Avatar from 'assets/svg/avatar.svg'
import InfoCircle from 'assets/svg/info-circle.svg'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { formatNumberWithLanguage } from 'utils/format'

const ASSET_CARDS = [
  { label: 'Asset Name', value: safeProp('name'), icon: <NameTag /> },
  {
    label: 'Asset Identifier',
    value: asset => <RenderHash hash={safeProp('identifier')(asset)} />,
    icon: <DifficultyIcon />,
  },
  {
    label: 'Asset Owner',
    value: asset => <RenderHash hash={safeProp('owner')(asset)} />,
    icon: <Avatar />,
  },
  {
    label: 'Total Supply',
    value: asset => formatNumberWithLanguage(safeProp('supply')(asset)),
    icon: <SupplyIcon />,
  },
  {
    label: 'Transaction',
    value: asset => (
      <RenderHash hash={safeProp('created_transaction_hash')(asset)} />
    ),
    icon: <DifficultyIcon />,
  },
]

function RenderHash({ hash }: { hash: string }) {
  return (
    <CopyValueToClipboard
      value={hash}
      label={<HashView hash={hash} parts={2} />}
    />
  )
}

function ExpandableText({ text }: { text: string }) {
  const truncatedRef = useRef<HTMLDivElement>(null)
  const fullSizeRef = useRef<HTMLDivElement>(null)
  const [truncatedHeight, setTruncatedHeight] = useState(0)
  const [fullHeight, setFullHeight] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const isExpandable = fullHeight > truncatedHeight

  const toggleIsExpanded = useCallback(() => {
    setIsExpanded(value => !value)
  }, [])

  const textContainerHeight = useMemo(() => {
    const size = isExpanded ? fullHeight : truncatedHeight

    if (!isExpandable || !size) {
      return 'auto'
    }

    return `${size}px`
  }, [fullHeight, isExpandable, isExpanded, truncatedHeight])

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === truncatedRef.current) {
          setTruncatedHeight(entry.contentRect.height)
        }
        if (entry.target === fullSizeRef.current) {
          setFullHeight(entry.contentRect.height)
        }
      }
    })

    observer.observe(truncatedRef.current)
    observer.observe(fullSizeRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const duration = '300ms'
  const timingFunction = 'ease-in-out'

  return (
    <Box>
      <Box
        position="relative"
        height={textContainerHeight}
        transition={`height ${duration} ${timingFunction}`}
      >
        <Text
          ref={truncatedRef}
          aria-hidden="true"
          as="span"
          color={isExpanded ? 'transparent' : undefined}
          transition={`color ${duration} ${timingFunction}`}
          display="block"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {text}
        </Text>
        <Text
          ref={fullSizeRef}
          as="span"
          color={isExpanded ? undefined : 'transparent'}
          transition={`color ${duration} ${timingFunction}`}
          display="block"
          position="absolute"
          top={0}
          left={0}
          width="100%"
        >
          {text}
        </Text>
      </Box>
      {isExpandable && (
        <Text
          color={NAMED_COLORS.LIGHT_BLUE}
          as="button"
          cursor="pointer"
          position="relative"
          onClick={toggleIsExpanded}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Text>
      )}
    </Box>
  )
}

type Props = {
  loading: boolean
  assetDetails: {
    id: number | string
    name: string
    owner: string
    supply: string
    metadata: string
    created_transaction_hash: string
  }
}

export function AssetInformationGrid({ loading, assetDetails }: Props) {
  const metadata = safeProp('metadata')(assetDetails) || 'n/a'

  return (
    <CardContainer>
      {ASSET_CARDS.map(card => (
        <Card
          key={card.label}
          label={card.label}
          icon={card.icon}
          value={card.value(assetDetails)}
          isLoading={loading}
          mb="1rem"
          width={{
            base: 'max(20rem, 100% - 0.5rem)',
            md: 'max(20rem, 50% - 1rem)',
            '2xl': 'max(20rem, 33.333333% - 1rem)',
          }}
        />
      ))}
      <Card
        label="Asset Metadata"
        icon={<InfoCircle />}
        value={<ExpandableText text={metadata} />}
        isLoading={loading}
        mb="1rem"
        height="auto"
        py="1.25rem"
        width={{
          base: 'max(20rem, 100% - 0.5rem)',
          md: 'max(20rem, 50% - 1rem)',
          '2xl': 'max(20rem, 33.333333% - 1rem)',
        }}
      />
    </CardContainer>
  )
}
