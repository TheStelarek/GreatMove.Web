import React, { ReactElement, useState } from 'react';
import Layout from '@/components/core/layout/Layout';
import Image from 'next/image';
import Button from '@/components/core/button/Button';
import Follow from '@/public/profile/follow.svg';
import Location from '@/public/profile/location.svg';
import Website from '@/public/profile/global.svg';
import Birthday from '@/public/profile/calendar.svg';
import Facebook from '@/public/profile/facebook.svg';
import Twitter from '@/public/profile/twitter.svg';
import Instagram from '@/public/profile/instagram.svg';
import ProfileDiscussion from '@/components/profile/discussion/ProfilDiscussion';
import styles from './Profile.module.scss';

const Profile = () => {
   const [showMe, setShowMe] = useState(0);

   return (
      <div className={styles.Container}>
         <div className={styles.imageContainer}>
            <Image src="/profile/banner.jpg" alt="Picture of the author" layout="fill" objectFit="cover" />
         </div>
         <div className={styles.botContainer}>
            <div className={styles.profileContainer}>
               <div className={styles.avatar}>
                  <Image src="/profile/avatar.png" alt="Picture of the author" layout="fill" objectFit="cover" />
               </div>
               <div className={styles.name}>
                  <p>Dennis Buk</p>
               </div>
               <div className={styles.tag}>
                  <p>@Hickari</p>
               </div>
               <div>
                  <Button
                     size="small"
                     leftIcon={<Follow className={styles.icon} />}
                     borderRadius={5}
                     variant="ghost-primary"
                  >
                     Follow
                  </Button>
               </div>
               <div className={styles.informationContainer}>
                  <div className={styles.informationWrapper}>
                     <Location className={styles.icon} /> <p>Warszawa</p>
                  </div>
                  <div className={styles.informationWrapper}>
                     <Website className={styles.icon} /> <p>Hickari.PL</p>
                  </div>
                  <div className={styles.informationWrapper}>
                     <Birthday className={styles.icon} /> <p>17.12.1997</p>
                  </div>
               </div>
               <div className={styles.SocialContainer}>
                  <p className={styles.socialText}>Social</p>
                  <div className={styles.socialWrapper}>
                     <Facebook className={styles.socialIcon} />
                     <Twitter className={styles.socialIcon} />
                     <Instagram className={styles.socialIcon} />
                  </div>
               </div>
            </div>
            <div className={styles.rightBox}>
               <div className={styles.menuContainer}>
                  <p className={styles.menuText}>
                     <button className={styles.menuButton} onClick={() => setShowMe(0)}>
                        Discussion
                     </button>
                  </p>
                  <p className={styles.menuText}>
                     <p className={styles.menuText}>
                        <button className={styles.menuButton} onClick={() => setShowMe(1)}>
                           Training
                        </button>
                     </p>
                  </p>
                  <p className={styles.menuText}>
                     <p className={styles.menuText}>
                        <button className={styles.menuButton} onClick={() => setShowMe(2)}>
                           Achievements
                        </button>
                     </p>
                  </p>
                  <p className={styles.menuText}>
                     <p className={styles.menuText}>
                        <button className={styles.menuButton} onClick={() => setShowMe(3)}>
                           Recipes
                        </button>
                     </p>
                  </p>
               </div>
               {(() => {
                  switch (showMe) {
                     case 0:
                        return <ProfileDiscussion />;
                        break;
                     case 1:
                        return <div> Training </div>;
                        break;
                     case 2:
                        return <div> Achievements </div>;
                        break;
                     case 3:
                        return <div> Recipes </div>;
                        break;
                     default:
                        return <ProfileDiscussion />;
                        break;
                  }
               })()}
            </div>
         </div>
      </div>
   );
};
export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
   return <Layout fullWidth>{page}</Layout>;
};
