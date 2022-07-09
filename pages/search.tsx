import { GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';

import { withLayout } from './../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { ParsedUrlQuery } from 'node:querystring';

function Search(): JSX.Element {
  return (
    <>
      Search
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
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
