import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import SettingsContainer from '@/features/settings/containers/SettingsContainer';

const AccountSettings = () => <SettingsContainer />;

export default AccountSettings;

AccountSettings.getLayout = function getLayout(page: ReactElement) {
   return (
      <MainLayout fullWidth navbarBoxShadow={false} navbarBottomBorder>
         {page}
      </MainLayout>
   );
};

AccountSettings.requireAuth = true;
