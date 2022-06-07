import { FC, useState, useEffect } from 'react'
import { Tooltip, IconButton } from '@ironfish/ui-kit'

import CopyIcon from 'icons/CopyIcon'
import CheckIcon from 'icons/CheckIcon'

interface CopyToClipboardButtonProps {
  value: string
}

const CopyToClipboardButton: FC<CopyToClipboardButtonProps> = ({ value }) => {
  const [$copied, $setCopied] = useState(false)

  useEffect(() => {
    if ($copied) {
      setTimeout(() => $setCopied(false), 1500)
    }
  }, [$copied])

  return (
    <Tooltip
      closeDelay={$copied ? 1500 : 0}
      label={$copied ? 'Copied' : 'Copy to clipboard'}
    >
      <IconButton
        aria-label="Copy to clipboard"
        h="1.25rem"
        onClick={() => {
          if (!$copied) {
            navigator.clipboard.writeText(value)
            $setCopied(true)
          }
        }}
        background="none"
        _focus={{
          boxShadow: 'none',
        }}
        _hover={{
          background: 'none',
        }}
        _active={{
          background: 'none',
        }}
        icon={
          $copied ? (
            <CheckIcon color="green" />
          ) : (
            <CopyIcon w="0.75rem" h="0.75rem" />
          )
        }
      />
    </Tooltip>
  )
}

export default CopyToClipboardButton
