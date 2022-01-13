import { FC } from 'react';
import styles from '@/features/auth/containers/resetPasswordContainer/ResetPasswordContainer.module.scss';
import ResetPasswordForm from '@/features/auth/components/resetPasswordForm/ResetPasswordForm';

const ResetPasswordContainer: FC<{ token: string }> = ({ token }) => (
   <div className={styles.container}>
      <div className={styles.box}>
         <h6 className={styles.heading}>Reset password</h6>

         <ResetPasswordForm token={token} />
      </div>
   </div>
);

export default ResetPasswordContainer;
