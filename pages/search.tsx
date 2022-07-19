import { GetStaticProps } from 'next';
import axios from 'axios';

import { withLayout } from './../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

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
