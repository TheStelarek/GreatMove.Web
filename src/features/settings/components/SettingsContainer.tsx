import React, { ReactElement } from 'react';
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

const SettingsContainer = () => (
   <div className={styles.container}>
      <div className={styles.leftBox}>
         <div className={styles.leftMenu}>
            <div className={styles.iconContainer}>
               <SettingsIcon className={styles.settingsIcon} />
               <div className={styles.iconText}>Settings</div>
            </div>
            <div className={styles.categoryContainer}>
               <div className={styles.editProfileContainter}>
                  <EditProfileIcon className={styles.icon} />
                  Edit Profile
                  <Arrow className={styles.arrow} />
               </div>
               <div className={styles.notificationsContainer}>
                  <NotificationsIcon className={styles.icon} />
                  Notifications
                  <Arrow className={styles.arrow} />
               </div>
               <div className={styles.securityContainer}>
                  <SecurityIcon className={styles.icon} />
                  Security and Login
                  <Arrow className={styles.arrow} />
               </div>
               <div className={styles.helpContainer}>
                  <HelpIcon className={styles.icon} />
                  Help and support
                  <Arrow className={styles.arrow} />
               </div>
            </div>
         </div>
      </div>

      <div className={styles.rightBox}>
         <p className={styles.title}>Edit Profile</p>
         <div className={styles.changeAvatar}>
            <Avatar className={styles.avatarIcon} />
            <Edit className={styles.editIcon} />
         </div>
         <div className={styles.inputsContainer}>
            <div className={styles.inputsWrapper}>
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
            </div>
            <div className={styles.inputsWrapper}>
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
            </div>
            <div className={styles.inputsWrapper}>
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
            </div>
            <div className={styles.inputsWrapper}>
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
            </div>
            <div className={styles.inputsWrapper}>
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
               <Input variant="gray" type="text" label="Name" placeholder="Your Name" size="big" />
            </div>
            <Button type="submit" size="large" isBold isFullWidth>
               Save
            </Button>
         </div>
      </div>
   </div>
);
export default SettingsContainer;
