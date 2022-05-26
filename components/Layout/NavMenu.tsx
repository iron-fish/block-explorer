import { FC, RefObject, ReactNode, useState } from 'react'
import {
  Box,
  Flex,
  useColorModeValue,
  NAMED_COLORS,
  Portal,
} from '@ironfish/ui-kit'

const burgerLineStyle = {
  width: '2rem',
  height: '0.1875rem',
  transition: 'all .3s ease-in-out',
}

interface NavMenuProps {
  menuRef: RefObject<HTMLElement>
  children: ReactNode
}

const NavMenu: FC<NavMenuProps> = ({ menuRef, children }) => {
  const $bg = useColorModeValue(NAMED_COLORS.DEEP_BLUE, NAMED_COLORS.WHITE)

  const [$showMenu, $setShowMenu] = useState<boolean>(false)

  const burgerSubLinesStyle = {
    content: `""`,
    position: 'absolute',
    bgColor: $bg,
    ...burgerLineStyle,
  }

  return (
    <Flex
      align="center"
      w={burgerLineStyle.width}
      h={burgerLineStyle.width}
      onClick={() => $setShowMenu(!$showMenu)}
    >
      <Box
        _before={{
          ...burgerSubLinesStyle,
          transform: $showMenu ? 'rotate(45deg)' : 'translateY(0.4375rem)',
        }}
        _after={{
          ...burgerSubLinesStyle,
          transform: $showMenu ? 'rotate(-45deg)' : 'translateY(-0.4375rem)',
        }}
        sx={{
          ...burgerLineStyle,
          bg: $showMenu ? 'transparent' : $bg,
        }}
      />
      <Portal containerRef={menuRef}>{$showMenu && children}</Portal>
    </Flex>
  )
}

export default NavMenu
