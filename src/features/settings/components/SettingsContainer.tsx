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
               <div className={styles.NotificationsContainer}>
                  <NotificationsIcon className={styles.Icon} />
                  Notifications
               </div>
               <div className={styles.SecurityContainer}>
                  <SecurityIcon className={styles.Icon} />
                  Security and Login
               </div>
               <div className={styles.HelpContainer}>
                  <HelpIcon className={styles.Icon} />
                  Help and support
               </div>
            </div>
         </div>
      </div>

      <div className={styles.RightBox}>
         <p className={styles.title}>Edit Profile</p>
         <div className={styles.ChangeAvatar}>
            <Avatar className={styles.AvatarIcon} />
            <Edit className={styles.EditIcon} />
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
