import cn from "classnames";

import Logo from "../assets/logo.svg";
import { Menu } from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";

import styles from "./Sidebar.module.css";
import {Search} from "../../components"

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      <Logo className={styles.logo}/>
      <Search/>
      <Menu/>
    </div>
  );
};