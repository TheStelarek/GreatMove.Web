import { FC } from 'react';
import cx from 'classnames';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { logout } from '@/features/auth/store/logout';
import styles from '@/features/settings/components/sidebar/Sidebar.module.scss';
import AccountSettings from '@/public/icons/account-settings.svg';
import Privacy from '@/public/icons/privacy.svg';
import Logout from '@/public/icons/logout.svg';

interface SidebarProps {
   setTab: React.Dispatch<React.SetStateAction<number>>;
   tab: number;
}

const Sidebar: FC<SidebarProps> = ({ setTab, tab }) => {
   const dispatch = useAppDispatch();

   return (
      <div className={styles.sidebar}>
         <ul className={styles.list}>
            <li className={cx(styles.listItem, tab === 0 && styles.listItemActive)}>
               <button className={styles.actionBtn} onClick={() => setTab(0)}>
                  <span>Edit profie</span>
                  <AccountSettings className={styles.icon} />
               </button>
            </li>
            <li className={cx(styles.listItem, tab === 1 && styles.listItemActive)}>
               <button className={styles.actionBtn} onClick={() => setTab(1)}>
                  <span>Change password</span>
                  <Privacy className={styles.icon} />
               </button>
            </li>
            <li className={styles.listItem}>
               <button className={styles.actionBtn} onClick={() => dispatch(logout())}>
                  <span>Logout</span>
                  <Logout className={styles.icon} />
               </button>
            </li>
         </ul>
      </div>
   );
};

export default Sidebar;
