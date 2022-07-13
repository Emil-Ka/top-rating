import cn from "classnames";
import {format} from "date-fns";
import {ru} from "date-fns/locale";

import UserIcon from "./user.svg";
import { ReviewProps } from "./Review.props";

import styles from "./Review.module.css";
import { P, Rating } from "../index";

export const Review = ({review, className, ...props}: ReviewProps): JSX.Element => {
  const {name, description, rating, title, createdAt} = review;

  return (
    <div className={cn(styles.review, className)} {...props}>
      <UserIcon className={styles.user}/>
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span className={styles.title}>{title}</span>
      </div>
      <span className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', {locale: ru})}
      </span>
      <Rating className={styles.rating} rating={rating}/>
      <P className={styles.description} size='s'>{description}</P>
    </div>
  );
};

