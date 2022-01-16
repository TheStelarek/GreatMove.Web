import { FC } from 'react';
import cx from 'classnames';
import styles from '@/features/settings/components/sidebar/Sidebar.module.scss';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { logout } from '@/features/auth/store/logout';
import Edit from '@/public/settings/edit.svg';

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
                  <Edit className={styles.icon} />
               </button>
            </li>
            <li className={cx(styles.listItem, tab === 1 && styles.listItemActive)}>
               <button className={styles.actionBtn} onClick={() => setTab(1)}>
                  <span>Change password</span>
                  <Edit className={styles.icon} />
               </button>
            </li>
            <li className={styles.listItem}>
               <button className={styles.actionBtn} onClick={() => dispatch(logout())}>
                  <span>Logout</span>
                  <Edit className={styles.icon} />
               </button>
            </li>
         </ul>
      </div>
   );
};

export default Sidebar;
