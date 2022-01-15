import { apiClient } from '@/api/apiClient';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import axios from 'axios';
import { ReactElement } from 'react';

interface EmailVerificationProps {
   verified: boolean;
   message: string;
}

const EmailVerification: NextApplicationPage<EmailVerificationProps> = ({ verified, message }) => (
   <>{verified ? <div>Account confirmed. Now you can sign in!</div> : <div>{message}</div>}</>
);

EmailVerification.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: { params: { token: string } }) {
   const { token } = context.params;
   let verified = false;
   let message = ``;

   try {
      await apiClient.patch(`/auth/email-confirmation?token=${token}`);
      verified = true;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         message = error.response?.status === 409 ? `Your confirmation link expired` : `Invalid confirmation link`;
      } else {
         message = `Something went wrong`;
      }

      verified = false;
   }

   return {
      props: {
         verified,
         message,
      },
   };
}
export default EmailVerification;
