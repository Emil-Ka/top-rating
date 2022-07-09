import { useReducer } from "react";
import { TopPageComponentProps } from "./TopPageComponent.props";

import styles from "./TopPageComponent.module.css";
import { Advantages, HhCard, Htag, P, Product, Sort, Tag } from "../../components";
import { TopLevelCategories } from "../../interfaces/toppage.interface";
import { SortEnum } from "../../components/Sort/Sort.props";

import {sortReducer} from "./sort.reducer"

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps) => {
  const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {sort: SortEnum.RATING, products});

  const setSort = (sort: SortEnum) => {
    dispatchSort({type: sort});
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Htag tag='h1'>{page.title}</Htag>
        {
          products && <Tag color='gray' size='m'>{products.length}</Tag>
        }
        <Sort sort={sort} setSort={setSort}/>
      </header>
      <div>
        {
          sortedProducts && sortedProducts.map(product => (
            <Product key={product._id} product={product}/>
          ))
        }
      </div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='m' href='https://hh.ru'>hh.ru</Tag>
      </div>
      <div className={styles.hhData}>
        {
          firstCategory === TopLevelCategories.Courses && page.hh && <HhCard {...page.hh}/>
        }
        {
          page.advantages && page.advantages.length > 0 &&
          <>
            <Htag tag='h2'>Преимущества</Htag>
            <Advantages advantages={page.advantages}/>
          </>
        }
        {
          page.seoText && <div className={styles.seoText} dangerouslySetInnerHTML={{__html: page.seoText}}/>
        }
        <Htag tag='h2'>Получаемые навыки</Htag>
        {
          page.tags.map((tag, index) => (
            <Tag key={index} color='purple'>{tag}</Tag>
          ))
        }
      </div>
    </div>
  );
};