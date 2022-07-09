import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export enum SortEnum {
  RATING,
  PRICE
}

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}