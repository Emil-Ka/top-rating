import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { Button, Htag, P, Rating, Tag } from '../components/index';

import styles from '../styles/Home.module.css';
import { withLayout } from './../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  
  return (
    <>
      <Tag color='gray' size='m'>Gray</Tag>
      <Tag color='purple'>Purple</Tag>
      <Rating isEditable rating={rating} setRating={setRating}/>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });

  return {
    props: {
      menu, 
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
