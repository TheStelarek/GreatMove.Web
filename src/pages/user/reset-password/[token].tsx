import { ReactElement } from 'react';
import ResetPasswordContainer from '@/features/auth/containers/resetPasswordContainer/ResetPasswordContainer';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';

interface ResetPasswordProps {
   token: string;
}

const ResetPassword: NextApplicationPage<ResetPasswordProps> = ({ token }) => <ResetPasswordContainer token={token} />;

ResetPassword.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: { params: { token: string } }) {
   const { token } = context.params;

   return {
      props: {
         token,
      },
   };
}
export default ResetPassword;
