import { useState } from 'react';
import ChangePassword from '@/features/settings/components/changePassword/ChangePassword';
import EditProfile from '@/features/settings/components/editProfile/EditProfile';
import Sidebar from '@/features/settings/components/sidebar/Sidebar';
import styles from '@/features/settings//containers/SettingsContainer.module.scss';

const SettingsContainer = () => {
   const [tab, setTab] = useState(0);

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <Sidebar tab={tab} setTab={setTab} />
            <div className={styles.content}>
               {tab === 0 && <EditProfile />}
               {tab === 1 && <ChangePassword />}
            </div>
         </div>
      </div>
   );
};
export default SettingsContainer;
