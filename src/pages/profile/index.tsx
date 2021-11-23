import React, { ReactElement, useMemo, useState } from 'react';
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
import Table from '@/components/core/table/Table';
import styles from './Profile.module.scss';

const homeBudgets = [
   {
      name: `test`,
      time: `1`,
      calories: `2`,
      proteins: `3`,
      fats: `4`,
      carbs: `5`,
   },
   {
      name: `test`,
      time: `1`,
      calories: `2`,
      proteins: `3`,
      fats: `4`,
      carbs: `5`,
   },
   {
      name: `Atest`,
      time: `1`,
      calories: `2`,
      proteins: `3`,
      fats: `4`,
      carbs: `5`,
   },
];

const columns = [
   {
      Header: `NAME`,
      accessor: `name` as const,
   },
   {
      Header: `TIME`,
      accessor: `time` as const,
   },
   {
      Header: `CALORIES`,
      accessor: `calories` as const,
   },
   {
      Header: `PROTEINS(G)`,
      accessor: `proteins` as const,
   },
   {
      Header: `FATS(G)`,
      accessor: `fats` as const,
   },
   {
      Header: `CARBS(G)`,
      accessor: `carbs` as const,
   },
];

const Profile = () => {
   const [showPage, setShowPage] = useState(0);

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
                     <button className={styles.menuButton} onClick={() => setShowPage(0)}>
                        Discussion
                     </button>
                  </p>
                  <p className={styles.menuText}>
                     <p className={styles.menuText}>
                        <button className={styles.menuButton} onClick={() => setShowPage(1)}>
                           Training
                        </button>
                     </p>
                  </p>
                  <p className={styles.menuText}>
                     <p className={styles.menuText}>
                        <button className={styles.menuButton} onClick={() => setShowPage(2)}>
                           Achievements
                        </button>
                     </p>
                  </p>
                  <p className={styles.menuText}>
                     <p className={styles.menuText}>
                        <button className={styles.menuButton} onClick={() => setShowPage(3)}>
                           Recipes
                        </button>
                     </p>
                  </p>
               </div>
               {showPage === 0 && <ProfileDiscussion />}
               {showPage === 1 && (
                  <div className={styles.recipeContainer}>
                     <Table
                        hasGlobalFilter
                        hasPagination
                        isSortable
                        isEquallyGrow
                        columns={columns}
                        data={homeBudgets}
                     />
                  </div>
               )}
               {showPage === 2 && <div> Achievements </div>}
               {showPage === 3 && (
                  <div className={styles.recipeContainer}>
                     <Table
                        hasGlobalFilter
                        hasPagination
                        isSortable
                        isEquallyGrow
                        columns={columns}
                        data={homeBudgets}
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
   return <Layout fullWidth>{page}</Layout>;
};
