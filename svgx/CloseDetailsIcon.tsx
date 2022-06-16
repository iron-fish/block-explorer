import { Icon, NAMED_COLORS, useColorModeValue } from '@ironfish/ui-kit'

export function CloseDetailsIcon(props) {
  const $colors = useColorModeValue(
    {
      border: NAMED_COLORS.LIGHT_GREY,
      icon: NAMED_COLORS.GREY,
    },
    {
      icon: NAMED_COLORS.PALE_GREY,
      border: NAMED_COLORS.DARK_GREY,
    }
  )
  return (
    <Icon
      w="40px"
      h="40px"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.9232 25.4927L14.3135 26.922L19.9803 21.4099L25.4925 27.0767L26.9218 25.6863L21.4097 20.0195L27.0765 14.5074L25.6861 13.078L20.0194 18.5902L14.5072 12.9234L13.0778 14.3137L18.59 19.9805L12.9232 25.4927Z"
        fill={$colors.icon}
      />
      <rect
        x="38.2423"
        y="38.7541"
        width="37"
        height="37"
        rx="18.5"
        transform="rotate(-179.207 38.2423 38.7541)"
        stroke={$colors.border}
      />
    </Icon>
  )
}
