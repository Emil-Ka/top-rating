import { FunctionComponent, useState, KeyboardEvent, useRef } from "react";
import cn from "classnames";

import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { LayoutProps } from "./Layout.props";
import { Sidebar } from "./Sidebar/Sidebar";

import styles from './Layout.module.css';
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components/index";

const Layout = ({children}: LayoutProps): JSX.Element => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Enter' || key.code === 'Space') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a 
        onFocus={() => setIsDisplayed(true)}
        tabIndex={1}
        onKeyDown={(key: KeyboardEvent) => skipContentAction(key)}
        className={cn(styles.skipLink, {
          [styles.displayed]: isDisplayed
        })}
      >
        Перейти к содержанию
      </a>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <div tabIndex={0} ref={bodyRef} className={styles.body}>
        {children}
      </div>
      <Footer className={styles.footer}/>
      <Up/>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props}/>
        </Layout>
      </AppContextProvider>
    );
  };
};