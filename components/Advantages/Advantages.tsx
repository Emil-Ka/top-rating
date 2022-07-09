import cn from "classnames";
import { useEffect, useState, KeyboardEvent } from "react";

import CheckIcon from './check.svg';
import { AdvantagesProps } from "./Advantages.props";

import styles from "./Advantages.module.css";
import { Htag, P } from "../index";

export const Advantages = ({advantages}: AdvantagesProps): JSX.Element => {
  return (
    <>
      {
        advantages.map(advantage => (
          <div key={advantage._id} className={styles.advantage}>
            <CheckIcon/>
            <Htag tag='h3' className={styles.title}>{advantage.title}</Htag>
            <hr className={styles.vline} />
            <P size='l'>{advantage.description}</P>
          </div>
        ))
      }
    </>
  );
};