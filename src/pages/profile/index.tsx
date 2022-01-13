import { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import ProfileContainer from '@/features/profile/containers/profileContainer/ProfileContainer';

const MyProfile = () => <ProfileContainer />;

export default MyProfile;

MyProfile.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout fullWidth>{page}</MainLayout>;
};
