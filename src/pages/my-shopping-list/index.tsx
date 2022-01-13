import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import ShoppingListContainer from '@/features/shoppingList/containers/shoppingListContainer/ShoppingListContainer';

const MyShoppingList = () => <ShoppingListContainer />;

export default MyShoppingList;

MyShoppingList.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
