import { SortEnum } from "../../components/Sort/Sort.props";
import { ProductModel } from "../../interfaces/product.interface";

type SortActions = {type: SortEnum.RATING} | {type: SortEnum.PRICE};

interface SortState {
  sort: SortEnum;
  products: ProductModel[];
};

export const sortReducer = (state: SortState, action: SortActions): SortState => {
  switch (action.type) {
    case SortEnum.RATING:
      return {
        sort: SortEnum.RATING,
        products: state.products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
      };
    case SortEnum.PRICE:
      return {
        sort: SortEnum.PRICE,
        products: state.products.sort((a, b) => a.price > b.price ? 1 : -1)
      };
    default:
      throw new Error('Неверный тип сортировки');
  }
}