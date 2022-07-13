import cn from "classnames";
import { forwardRef, ForwardedRef } from "react";

import { TextareaProps } from "./Textarea.props";

import styles from "./Textarea.module.css";

export const Textarea = forwardRef(({className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <div className={cn(styles.textareaWrapper, className)}>
      <textarea 
        className={cn(styles.textarea, {
          [styles.error]: error
        })} 
        ref={ref}
        {...props}>
      </textarea>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});