import {useEffect} from "react";
import {useAnimation, motion} from "../../node_modules/framer-motion";

import {useScrollY} from "../../hooks/useScrollY";
import { ButtonIcon } from "../index";

import styles from "./Up.module.css";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({
      opacity: y / document.body.scrollHeight
    });
  }, [y]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      className={styles.up}
      animate={controls}
      initial={{opacity: 0}}>
      <ButtonIcon 
        appearance='primary' 
        icon='up'
        onClick={scrollToTop}/>
    </motion.div>
  );
};