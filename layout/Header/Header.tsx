import cn from "classnames";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {motion} from "../../node_modules/framer-motion";

import { HeaderProps } from "./Header.props";
import { ButtonIcon } from "../../components/index";
import {Sidebar} from "../Sidebar/Sidebar";
import Logo from "../assets/logo.svg";

import styles from "./Header.module.css";

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%'
    },
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    }
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo/>
      <ButtonIcon 
        appearance='white' 
        icon='menu' 
        onClick={() => setIsOpened(true)}/>
      <motion.div 
        className={styles.mobileMenu} 
        variants={menuVariants}
        initial="closed"
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar/>
        <ButtonIcon 
          className={styles.mobileClose} 
          appearance='white' 
          icon='close' 
          onClick={() => setIsOpened(false)}/>
      </motion.div>
    </header>
  );
};