import cn from "classnames";
import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/router";

import { SearchProps } from "./Search.props";
import { Button, Input } from "../index";
import GlassIcon from "./glass.svg";

import styles from "./Search.module.css";

export const Search = ({className, ...props}: SearchProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();

  const goToSearchPage = () => {
    router.push({
      pathname: '/search',
      query: {
        q: searchValue
      }
    });
  };

  const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      goToSearchPage();
    }
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input 
        className={styles.input}
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handlerKeyDown}/>
      <Button 
        className={styles.button} 
        appearance="primary"
        onClick={goToSearchPage}>
        <GlassIcon/>
      </Button>
    </div>
  );
};