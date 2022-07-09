import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";

import { AppContext } from "../../context/app.context";
import { PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";

import styles from "./Menu.module.css";

export const Menu = (): JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
      }

      return m;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <>
        {
          firstLevelMenu.map(menu => (
            <div key={menu.route}>
                <div className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: menu.id === firstCategory
                })}>
                  {menu.icon}
                  <span>{menu.name}</span>
                </div>
                {menu.id === firstCategory && buildSecondLevel(menu.route)}
            </div>
          ))
        }
      </>
    )
  };

  const buildSecondLevel = (route: string) => {
    return (
      <div className={styles.secondBlock}>
        {
          menu.map(m => {
            if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
              m.isOpened = true;
            }

            return (
              <div key={m._id.secondCategory}>
                <div 
                  className={styles.secondLevel} 
                  onClick={() => openSecondLevel(m._id.secondCategory)}
                  >
                  {m._id.secondCategory}
                </div>
                <div className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpen]: m.isOpened
                })}>
                  {buildThirdLevel(m.pages, route)}
                </div>
              </div>
            );
          })
        }
      </div>
    )
  };

  const buildThirdLevel = (page: PageItem[], route: string) => {
    return (
      page.map(p => (
        <Link key={p._id} href={`/${route}/${p.alias}`}>
          <a className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
          })}>
            {p.category}
          </a>
        </Link>
      ))
    )
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
};