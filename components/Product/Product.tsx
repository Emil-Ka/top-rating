import cn from "classnames";
import Image from "next/image";
import {useRef, useState} from "react";

import { ProductProps } from "./Product.props";

import styles from "./Product.module.css";
import { Button, Card, Divider, Htag, Rating, Review, ReviewForm, Tag } from "../index";
import { declOfNum, priceRu } from "../../helpers/helpers";

export const Product = ({product, className}: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <Card className={cn(styles.product, className)}>
        <div className={styles.logo}>
          <Image 
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
            alt={product.title}
            width={70} 
            height={70}/>
        </div>
        <div className={styles.title}><Htag tag='h3'>{product.title}</Htag></div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
        </div>
        <div className={styles.credit}>{priceRu(product.credit)}<span className={styles.month}>/мес</span></div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating}/>
        </div>
        <div className={styles.tags}>
          {product.categories.map(category => (
            <Tag className={styles.category} color='ghost' key={category}>{category}</Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.ratingTitle}>
          <a href="#ref" onClick={scrollToReview}>
            {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <div className={styles.hr}><Divider/></div>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.features}>
          {product.characteristics.map(char => (
            <div className={styles.characteristics} key={char.name}>
              <span className={styles.characteristicsName}>{char.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{char.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && <div className={styles.advantages}>
            <Htag className={styles.advTitle} tag='h4'>Преимущества</Htag>
            <p>{product.advantages}</p>
          </div>}
          {product.disadvantages && <div className={styles.disadvantages}>
            <Htag className={styles.advTitle} tag='h4'>Недостатки</Htag>
            <p>{product.disadvantages}</p>
          </div>}
        </div>
        <div className={cn(styles.hr, styles.hr2)}><Divider/></div>
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          <Button 
            className={styles.reviewButton} 
            appearance='ghost' 
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          >Читать отзывы</Button>
        </div>
      </Card>
      <Card color='blue' className={cn(styles.reviews, {
        [styles.opened]: isReviewOpened,
        [styles.closed]: !isReviewOpened
      })}
        ref={reviewRef}>
        {
          product.reviews.map(review => (
            <div key={review._id}>
              <Review review={review}/>
              <Divider/>
            </div>
          ))
        }
        <ReviewForm productId={product._id}/>
      </Card>
    </>
  );
};

