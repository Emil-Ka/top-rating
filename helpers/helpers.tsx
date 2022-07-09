import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategories } from '../interfaces/toppage.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {route: 'courses', name: 'Курсы', id: TopLevelCategories.Courses, icon: <CoursesIcon/>},
  {route: 'services', name: 'Сервисы', id: TopLevelCategories.Services, icon: <ServicesIcon/>},
  {route: 'books', name: 'Книги', id: TopLevelCategories.Books, icon: <BooksIcon/>},
  {route: 'products', name: 'Продукты', id: TopLevelCategories.Products, icon: <ProductsIcon/>}
];

export const priceRu = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');
}