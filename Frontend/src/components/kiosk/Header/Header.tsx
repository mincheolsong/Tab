import { FC } from "react";
import { HeaderProps } from ".";
import './style.css'

export const Header: FC<HeaderProps> = (props) => {
  return <div {...props}>
    <div className="Header">Header</div>

  </div>;
};
