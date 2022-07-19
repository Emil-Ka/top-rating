import { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { Input, Rating, Tag, Textarea } from '../components/index';
import { API } from "../helpers/api";
import { withLayout } from './../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  
  return (
    <>
      <Tag color='gray' size='m'>Gray</Tag>
      <Tag color='purple'>Purple</Tag>
      <Rating isEditable rating={rating} setRating={setRating}/>
      <Input placeholder='Имя'/>
      <Textarea placeholder='Введите текст'/>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  //Здесь мы получаем массив со вторыми категориями (дизай, аналитика), а в pages хранятся категории 3-го уровня с самими курсами (Photoshop, Figma)

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
