import { FC } from "react";
import { Icon, IconProps } from "@ironfish/ui-kit";

const CopyIcon: FC<IconProps> = (props) => (
  <Icon viewBox="0 0 12 12" color="#2C72FF" {...props}>
    <path
      d="M8 .5H2c-.55 0-1 .45-1 1v7h1v-7h6v-1Zm1.5 2H4c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h5.5c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1Zm0 8H4v-7h5.5v7Z"
      fill="#7F7F7F"
    />
  </Icon>
);

export default CopyIcon;
