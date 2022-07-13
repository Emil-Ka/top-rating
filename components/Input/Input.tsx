import cn from "classnames";
import { forwardRef, ForwardedRef } from "react";

import { InputProps } from "./Input.props";

import styles from "./Input.module.css";

export const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={cn(styles.inputWrapper, className)}>
      <input 
        className={cn(styles.input, {
          [styles.error]: error
        })} 
        ref={ref} 
        {...props}/>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});