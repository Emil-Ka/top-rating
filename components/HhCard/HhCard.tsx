import cn from "classnames";
import { useEffect, useState, KeyboardEvent } from "react";

import { HhCardProps } from "./HhCard.props";
import StarIcon from "./star.svg";
import {Card} from "../index"

import styles from "./HhCard.module.css";
import { priceRu } from "../../helpers/helpers";

export const HhCard = ({count, juniorSalary, middleSalary, seniorSalary}: HhCardProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
          <div className={styles.rate}>
            <StarIcon className={styles.filled}/>
            <StarIcon/>
            <StarIcon/>
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
          <div className={styles.rate}>
            <StarIcon className={styles.filled}/>
            <StarIcon className={styles.filled}/>
            <StarIcon/>
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
          <div className={styles.rate}>
            <StarIcon className={styles.filled}/>
            <StarIcon className={styles.filled}/>
            <StarIcon className={styles.filled}/>
          </div>
        </div>
      </Card>
    </div>
  );
};