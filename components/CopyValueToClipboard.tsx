import { FC } from 'react'
import { HStack, BoxProps, StackProps, Box } from '@ironfish/ui-kit'

import CopyToClipboardButton from './CopyToClipboardButton'

interface CopyValueToClipboardProps {
  label: string
  value: string
  labelProps?: BoxProps
  containerProps?: StackProps
}

const CopyValueToClipboard: FC<CopyValueToClipboardProps> = ({
  label,
  value,
  labelProps = {},
  containerProps = {},
}) =>
  value && (
    <HStack spacing={0} {...containerProps}>
      <Box as="h4" {...labelProps}>
        {label}
      </Box>
      <CopyToClipboardButton value={value} />
    </HStack>
  )

export default CopyValueToClipboard
