import React, { useState } from 'react';
import cx from 'classnames';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import SettingsIcon from '@/public/settings/settings.svg';
import LogoutIcon from '@/public/settings/logout.svg';
import PasswordIcon from '@/public/settings/password.svg';
import EditProfileIcon from '@/public/settings/pen.svg';
import Arrow from '@/public/settings/arrow.svg';
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
                  <button className={styles.changePasswordContainer} onClick={() => setShowPage(1)}>
                     <PasswordIcon className={cx(styles.icon, showPage === 1 && styles.activeIcon)} />
                     <div className={cx(styles.buttonText, showPage === 1 && styles.activeButtonText)}>
                        Change password
                     </div>
                     <Arrow className={cx(styles.arrow, showPage === 1 && styles.activeArrow)} />
                  </button>
                  <button className={styles.logoutContainer}>
                     <LogoutIcon className={cx(styles.icon, showPage === 2 && styles.activeIcon)} />
                     <div className={cx(styles.buttonText, showPage === 2 && styles.activeButtonText)}>Logout</div>
                     <Arrow className={cx(styles.arrow, showPage === 2 && styles.activeArrow)} />
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
                  <div className={styles.lastInputsWrapper}>
                     <Input variant="gray" type="text" label="Email " placeholder="Enter your email" size="big" />
                  </div>
                  <Button type="submit" size="large" isBold isFullWidth>
                     Save
                  </Button>
               </div>
            </div>
         )}
         {showPage === 1 && (
            <div className={styles.rightBox}>
               <p className={styles.title}>Change Password</p>
               <div className={styles.inputsContainer}>
                  <div className={styles.lastInputsWrapper}>
                     <Input
                        variant="gray"
                        type="password"
                        label="Old password "
                        placeholder="Enter your old password"
                        size="big"
                     />
                  </div>
                  <div className={styles.inputsWrapper}>
                     <Input
                        variant="gray"
                        type="password"
                        label="New password"
                        placeholder="Enter your new password"
                        size="big"
                     />
                     <Input
                        variant="gray"
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm your new password"
                        size="big"
                     />
                  </div>

                  <Button type="submit" size="large" isBold isFullWidth>
                     Save
                  </Button>
               </div>
            </div>
         )}
      </div>
   );
};
export default SettingsContainer;
