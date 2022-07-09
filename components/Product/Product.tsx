import cn from "classnames";
import { useEffect, useState, KeyboardEvent } from "react";

import { ProductProps } from "./Product.props";

import styles from "./Product.module.css";
import { Card, Htag, Rating, Tag } from "../index";

export const Product = ({product, className}: ProductProps): JSX.Element => {
  return (
    <Card className={cn(styles.product, className)}>
      <div className={styles.logo}><img src={product.image} alt={product.title}/></div>
      <div className={styles.title}><Htag tag='h3'>{product.title}</Htag></div>
      <div className={styles.price}>{product.price}</div>
      <div className={styles.credit}>{product.credit}</div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating}/>
      </div>
      <div className={styles.tags}>
        {product.categories.map(category => (
          <Tag color='ghost' key={category}>{category}</Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>кредит</div>
    </Card>
  );
};