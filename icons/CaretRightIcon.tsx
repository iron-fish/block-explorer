import { Icon, IconProps } from '@ironfish/ui-kit'

const SvgComponent = (props: IconProps) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width="7"
    height="7"
    fill="none"
    viewBox="0 0 24 22"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M7.158 6.175 10.975 10l-3.817 3.825L8.333 15l5-5-5-5-1.175 1.175Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M20 20H0V0h20z" />
      </clipPath>
    </defs>
  </Icon>
)

export default SvgComponent
