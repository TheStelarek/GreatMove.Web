import React, { ReactElement } from 'react';
import Layout from '@/components/core/layout/Layout';
import SettingsIcon from '@/public/settings/settings.svg';
import HelpIcon from '@/public/settings/help.svg';
import NotificationsIcon from '@/public/settings/notification.svg';
import EditProfileIcon from '@/public/settings/pen.svg';
import Arrow from '@/public/settings/arrow.svg';
import SecurityIcon from '@/public/settings/security.svg';
import styles from './Settings.module.scss';

const Settings = () => (
   <div className={styles.Container}>
      <div className={styles.LeftBox}>
         <div className={styles.LeftMenu}>
            <div className={styles.IconContainer}>
               <SettingsIcon className={styles.SettingsIcon} />
               <div className={styles.IconText}>Settings</div>
            </div>

            <div className={styles.CategoryContainer}>
               <div className={styles.EditProfileContainter}>
                  <EditProfileIcon className={styles.Icon} />
                  Edit Profile
                  <Arrow className={styles.Arrow} />
               </div>
               <div className={styles.Notifications}>Notifications</div>
               <div className={styles.EditProfile}>Security and Login</div>
               <div className={styles.EditProfile}>Help and support</div>
            </div>
         </div>
      </div>
   </div>
);
export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
   return <Layout fullWidth>{page}</Layout>;
};
