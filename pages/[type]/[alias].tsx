import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { firstLevelMenu } from "../../helpers/helpers";

import { MenuItem } from "../../interfaces/menu.interface";
import { ProductModel } from "../../interfaces/product.interface";
import { TopLevelCategories, TopPageModel } from "../../interfaces/toppage.interface";
import { withLayout } from "../../layout/Layout";
import { TopPageComponent } from "../../page-components/index";

function TopPage({products, page, firstCategory}: TopPageProps): JSX.Element {
  return <TopPageComponent products={products} page={page} firstCategory={firstCategory}/>;
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: m.id
    });

    paths = paths.concat(menu.flatMap(s => s.pages.map(page => `/${m.route}/${page.alias}`)));
  }
  console.log(paths);

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TopPageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
  
  if (!params) {
    return {
      notFound: true
    };
  }

  try {
    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

    if (!firstCategoryItem) {
      return {
        notFound: true
      };
    }

    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: firstCategoryItem.id
    });

    if (menu.length === 0) {
      return {
        notFound: true
      };
    }

    const {data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + `/api/top-page/byAlias/${params.alias}`);

    const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
      category: page.category,
      limit: 10
    });

    return {
      props: {
        menu, 
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  } catch(err) {
    return {
      notFound: true
    };
  }
}

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategories;
  page: TopPageModel;
  products: ProductModel[];
}
