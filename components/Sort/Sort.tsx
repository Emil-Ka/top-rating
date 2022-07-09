import cn from "classnames";

import { SortEnum, SortProps } from "./Sort.props";
import SortIcon from "./sort.svg";

import styles from "./Sort.module.css";

export const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(SortEnum.RATING)}
        className={cn({
          [styles.active]: sort === SortEnum.RATING
        })}>
        <SortIcon className={styles.sortIcon}/> По рейтингу
      </span>
      <span
        onClick={() => setSort(SortEnum.PRICE)}
        className={cn({
          [styles.active]: sort === SortEnum.PRICE
        })}>
        <SortIcon className={styles.sortIcon}/> По цене
      </span>
    </div>
  );
};