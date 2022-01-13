import React, { useState } from 'react';
import cx from 'classnames';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import SettingsIcon from '@/public/settings/settings.svg';
import HelpIcon from '@/public/settings/help.svg';
import NotificationsIcon from '@/public/settings/notification.svg';
import EditProfileIcon from '@/public/settings/pen.svg';
import Arrow from '@/public/settings/arrow.svg';
import SecurityIcon from '@/public/settings/security.svg';
import Avatar from '@/public/settings/avatar.svg';
import Edit from '@/public/settings/edit.svg';
import styles from './SettingsContainer.module.scss';

const SettingsContainer = () => {
   const [showPage, setShowPage] = useState(0);

   return (
      <div className={styles.container}>
         <div className={styles.leftBox}>
            <div className={styles.leftMenu}>
               <div className={styles.iconContainer}>
                  <SettingsIcon className={styles.settingsIcon} />
                  <div className={styles.iconText}>Settings</div>
               </div>
               <div className={styles.categoryContainer}>
                  <button className={styles.editProfileContainter} onClick={() => setShowPage(0)}>
                     <EditProfileIcon className={cx(styles.icon, showPage === 0 && styles.activeIcon)} />
                     <div className={cx(styles.buttonText, showPage === 0 && styles.activeButtonText)}>
                        Edit Profile
                     </div>
                     <Arrow className={cx(styles.arrow, showPage === 0 && styles.activeArrow)} />
                  </button>
                  <button className={styles.notificationsContainer} onClick={() => setShowPage(1)}>
                     <NotificationsIcon className={cx(styles.icon, showPage === 1 && styles.activeIcon)} />
                     <div className={cx(styles.buttonText, showPage === 1 && styles.activeButtonText)}>
                        Notifications
                     </div>
                     <Arrow className={cx(styles.arrow, showPage === 1 && styles.activeArrow)} />
                  </button>
                  <button className={styles.securityContainer} onClick={() => setShowPage(2)}>
                     <SecurityIcon className={cx(styles.icon, showPage === 2 && styles.activeIcon)} />
                     <div className={cx(styles.buttonText, showPage === 2 && styles.activeButtonText)}>
                        Security and Login
                     </div>
                     <Arrow className={cx(styles.arrow, showPage === 2 && styles.activeArrow)} />
                  </button>
                  <button className={styles.helpContainer} onClick={() => setShowPage(3)}>
                     <HelpIcon className={cx(styles.icon, showPage === 3 && styles.activeIcon)} />
                     <div className={cx(styles.buttonText, showPage === 3 && styles.activeButtonText)}>
                        Help and support
                     </div>
                     <Arrow className={cx(styles.arrow, showPage === 3 && styles.activeArrow)} />
                  </button>
               </div>
            </div>
         </div>
         {showPage === 0 && (
            <div className={styles.rightBox}>
               <p className={styles.title}>Edit Profile</p>
               <div className={styles.changeAvatar}>
                  <Avatar className={styles.avatarIcon} />
                  <Edit className={styles.editIcon} />
               </div>
               <div className={styles.inputsContainer}>
                  <div className={styles.inputsWrapper}>
                     <Input
                        variant="gray"
                        type="text"
                        label="First name"
                        placeholder="Enter your first name"
                        size="big"
                     />
                     <Input
                        variant="gray"
                        type="text"
                        label="Last name"
                        placeholder="Enter your last name"
                        size="big"
                     />
                  </div>
                  <div className={styles.inputsWrapper}>
                     <Input variant="gray" type="text" label="Adress" placeholder="Enter your adress" size="big" />
                     <Input variant="gray" type="text" label="City" placeholder="Enter your city" size="big" />
                  </div>
                  <div className={styles.inputsWrapper}>
                     <Input variant="gray" type="text" label="State" placeholder="Enter your state" size="big" />
                     <Input variant="gray" type="text" label="Zip-code" placeholder="Enter your zip-code" size="big" />
                  </div>
                  <div className={styles.inputsWrapper}>
                     <Input variant="gray" type="text" label="Country" placeholder="Enter your country" size="big" />
                     <Input
                        variant="gray"
                        type="text"
                        label="Contact number"
                        placeholder="Enter your contact number"
                        size="big"
                     />
                  </div>
                  <Button type="submit" size="large" isBold isFullWidth>
                     Save
                  </Button>
               </div>
            </div>
         )}
         {showPage === 1 && (
            <div className={styles.rightBox}>
               <p className={styles.title}>Notifications</p>
            </div>
         )}
         {showPage === 2 && (
            <div className={styles.rightBox}>
               <p className={styles.title}>Security and Login</p>
            </div>
         )}
         {showPage === 3 && (
            <div className={styles.rightBox}>
               <p className={styles.title}>Help and Support</p>
            </div>
         )}
      </div>
   );
};
export default SettingsContainer;
