import React, { FC } from 'react'
import { Flex, NAMED_COLORS } from '@ironfish/ui-kit'
import { RefreshIcon } from 'svgx'

interface RefreshButtonProps {
  isVisible: boolean
  onClick: () => unknown
  offsetTop?: string | number
}

const RefreshButton: FC<RefreshButtonProps> = ({
  isVisible,
  onClick,
  offsetTop,
}) => {
  return (
    isVisible && (
      <Flex
        alignItems="center"
        justifyContent="center"
        gap="0.375rem"
        top={offsetTop}
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          background: NAMED_COLORS.LIGHT_RED,
          color: NAMED_COLORS.DEEP_BLUE,
          boxShadow: '0rem 0.25rem 0.6875rem rgba(0, 0, 0, 0.04)',
          padding: '0.625rem 1.5rem',
          position: 'fixed',
          right: 0,
          left: 0,
          margin: 'auto',
          zIndex: 3,
          w: '100%',
          transition: 'background 300ms ease-out',
          _hover: {
            background: '#F8A0D7',
            color: NAMED_COLORS.BLACK,
            transition: 'background 300ms ease-in',
          },
        }}
      >
        <RefreshIcon />
        <h5>Refresh</h5>
      </Flex>
    )
  )
}

export default RefreshButton
