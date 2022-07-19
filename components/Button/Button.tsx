import cn from "classnames";
import {motion, useMotionValue} from "../../node_modules/framer-motion";
import {useEffect} from "react";

import { ButtonProps } from "./Button.props";
import ArrowIcon from './arrow.svg';

import styles from "./Button.module.css";

export const Button = ({appearance, children, arrow = 'none', className, ...props}: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1);

  useEffect(() => {
    scale.onChange(s => console.log(s));
  }, []);

  return (
    <motion.button 
      whileHover={{scale: 1.05}}
      style={{scale}}
      className={cn(styles.button, className, {
      [styles.primary]: appearance === 'primary',
      [styles.ghost]: appearance === 'ghost'
    })}
    {...props}
    >
      {children}
      {
        arrow !== 'none' && 
        <span className={cn(styles.arrow, {
          [styles.down]: arrow === 'down'
        })}>
          <ArrowIcon/>
        </span>
      }
    </motion.button>
  );
};