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
};

//titles = [отзыв, отзыва, отзывов]
export const declOfNum = (number: number, titles: [string, string, string]): string => {
  //0 отзывов, 1 отзыв, 2 отзыва ... 5 отзывов (Здесь собраны склонения для чисел от 0 до 5)
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}