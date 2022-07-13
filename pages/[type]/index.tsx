import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { firstLevelMenu } from "../../helpers/helpers";

import { MenuItem } from "../../interfaces/menu.interface";
import { ProductModel } from "../../interfaces/product.interface";
import { TopLevelCategories, TopPageModel } from "../../interfaces/toppage.interface";
import { withLayout } from "../../layout/Layout";
import { API } from "../../helpers/api"

function TypePage({firstCategory}: TypePageProps): JSX.Element {
  return (
    <>
      Type: {firstCategory}
    </>
  );
}

export default withLayout(TypePage);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => `/${m.route}`),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TypePageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  });
  //Здесь мы получаем массив со вторыми категориями (дизай, аналитика), а в pages хранятся категории 3-го уровня с самими курсами (Photoshop, Figma)

  return {
    props: {
      menu, 
      firstCategory: firstCategoryItem.id
    }
  };
};

interface TypePageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}