import { ProductModel } from "../../interfaces/product.interface";
import { TopLevelCategories, TopPageModel } from "../../interfaces/toppage.interface";

export interface TopPageComponentProps {
  firstCategory: TopLevelCategories;
  page: TopPageModel;
  products: ProductModel[];
}