import { authSelector } from '@/store/auth/AuthSlice';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '@/components/core/spinner/Spinner';
import styles from '@/components/authGuard/AuthGuard.module.scss';

const AuthGuard: React.FC = ({ children }) => {
  const { isLoggedIn, roles } = useAppSelector(authSelector);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(`/login`);
    }
  }, [isLoggedIn, roles]);

  if (!isLoggedIn)
    return (
      <div className={styles.container}>
        <Spinner big blue />
      </div>
    );

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;