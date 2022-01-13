import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import SettingsContainer from '@/features/settings/components/SettingsContainer';

const MyShoppingList = () => <SettingsContainer />;

export default MyShoppingList;

MyShoppingList.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout fullWidth>{page}</MainLayout>;
};
