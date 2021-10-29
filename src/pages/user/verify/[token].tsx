import { apiClient } from '@/api/apiClient';
import axios from 'axios';

interface EmailVerificationProps {
   verified: boolean;
   message: string;
}

const EmailVerificationPage: React.FC<EmailVerificationProps> = ({ verified, message }) => (
   <>{verified ? <div>Account confirmed. Now you can sign in!</div> : <div>{message}</div>}</>
);

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
export default EmailVerificationPage;
