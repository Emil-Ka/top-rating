import { useContext, useEffect, useState, KeyboardEvent } from "react";
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";
import {motion} from "../../node_modules/framer-motion";

import { AppContext } from "../../context/app.context";
import { PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";

import styles from "./Menu.module.css";

export const Menu = (): JSX.Element => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    },
    hidden: {
      marginBottom: 0
    }
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      maxHeight: 48
    },
    hidden: {
      opacity: 0,
      maxHeight: 0
    }
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
      }

      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Enter' || key.code === 'Space') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  }

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
                  tabIndex={0}
                  className={styles.secondLevel} 
                  onClick={() => openSecondLevel(m._id.secondCategory)}
                  onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                  >
                  {m._id.secondCategory}
                </div>
                <motion.div
                  className={styles.secondLevelBlock}
                  layout
                  variants={variants}
                  initial={m.isOpened ? 'visible' : 'hidden'}
                  animate={m.isOpened ? 'visible' : 'hidden'}
                >
                  {buildThirdLevel(m.pages, route, m.isOpened ?? false)}
                </motion.div>
              </div>
            );
          })
        }
      </div>
    )
  };

  const buildThirdLevel = (page: PageItem[], route: string, isOpened: boolean) => {
    return (
      page.map(p => (
        <motion.div key={p._id} variants={variantsChildren}>
          <Link href={`/${route}/${p.alias}`}>
            <a tabIndex={isOpened ? 0 : -1}
              className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
            })}>
              {p.category}
            </a>
          </Link>
        </motion.div>
      ))
    )
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
};