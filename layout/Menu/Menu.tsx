import { useContext, useEffect } from "react";
import cn from "classnames";

import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategories } from "../../interfaces/toppage.interface";

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

import styles from "./Menu.module.css";

const firstLevelMenu: FirstLevelMenuItem[] = [
  {route: 'courses', name: 'Курсы', id: TopLevelCategories.Courses, icon: <CoursesIcon/>},
  {route: 'services', name: 'Сервисы', id: TopLevelCategories.Services, icon: <ServicesIcon/>},
  {route: 'books', name: 'Книги', id: TopLevelCategories.Books, icon: <BooksIcon/>},
  {route: 'products', name: 'Продукты', id: TopLevelCategories.Products, icon: <ProductsIcon/>}
];

export const Menu = (): JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <>
        {
          firstLevelMenu.map(menu => (
            <div key={menu.route}>
              <a href={'/' + menu.route}>
                <div className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: menu.id === firstCategory
                })}>
                  {menu.icon}
                  <span>{menu.name}</span>
                </div>
                {menu.id === firstCategory && buildSecondLevel()}
              </a>
            </div>
          ))
        }
      </>
    )
  };

  const buildSecondLevel = () => {
    return (
      <div>
        {
          menu.map(m => (
            <div key={m._id.secondCategory}>
              <div className={styles.secondLevel}>{m._id.secondCategory}</div>
              <div className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpen]: m.isOpened
              })}>
                {}
              </div>
            </div>
          ))
        }
      </div>
    )
  };

  const buildThirdLevel = () => {

  };

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
};