import cn from "classnames";
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";

import { RatingProps } from "./Rating.props";
import StarIcon from "./star.svg";

import styles from "./Rating.module.css";

export const Rating = forwardRef(({isEditable = false, rating, error, setRating, className, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [starArray, setStarArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const changeStarArray = (currentRating: number): void => {
    const updatedArray = starArray.map((star, index) => (
      <span
        className={cn(styles.star, {
          [styles.filled]: index < currentRating,
          [styles.editable]: isEditable
        })}
        onMouseEnter={() => changeDisplay(index + 1)}
        onMouseLeave={() => changeDisplay(rating)}
        onClick={() => changeRating(index + 1)}
        tabIndex={isEditable ? 0 : -1}
        onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => isEditable && handleSpace(e, index + 1)}
      >
        <StarIcon/>
      </span>
    ));

    setStarArray(updatedArray);
  };

  useEffect(() => {
    changeStarArray(rating);
  }, [rating]);

  const changeDisplay = (index: number): void => {
    if (!isEditable) {
      return;
    }

    changeStarArray(index);
  };

  const changeRating = (rating: number): void => {
    if (!isEditable || !setRating) {
      return;
    }

    setRating(rating);
  };

  const handleSpace = (e: KeyboardEvent<HTMLSpanElement>, rating: number): void => {
    if (e.code !== 'Space' || !setRating) {
      return;
    }

    setRating(rating);
  };

  return (
    <div ref={ref} className={cn(styles.starBlock, className, {
      [styles.error]: error
    })} {...props}>
      {
        starArray.map((star, index) => (
          <span key={index}>{star}</span>
        ))
      }
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});