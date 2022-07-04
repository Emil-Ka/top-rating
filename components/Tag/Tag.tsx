import cn from "classnames";

import { TagProps } from "./Tag.props";

import styles from "./Tag.module.css";

export const Tag = ({children, size = 's', href, color = 'ghost', className, ...props}: TagProps): JSX.Element => {
  return (
    <div className={cn(styles.tag, {
      [styles.s]: size === 's',
      [styles.m]: size === 'm',
      [styles.ghost]: color === 'ghost',
      [styles.red]: color === 'red',
      [styles.green]: color === 'green',
      [styles.gray]: color === 'gray',
      [styles.purple]: color === 'purple'
    })} {...props}>
      {
        href
          ? <a href={href}>{children}</a>
          : <>{children}</>
      }
    </div>
  );
};