import React, { ReactElement, useMemo, useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Button from '@/components/core/button/Button';
import Follow from '@/public/profile/follow.svg';
import Location from '@/public/profile/location.svg';
import Website from '@/public/profile/global.svg';
import Birthday from '@/public/profile/calendar.svg';
import Facebook from '@/public/profile/facebook.svg';
import Twitter from '@/public/profile/twitter.svg';
import Instagram from '@/public/profile/instagram.svg';
import Table from '@/components/core/table/Table';
import Recipes from '@/public/profile/recipes.svg';
import Discussion from '@/public/profile/discussion.svg';
import Training from '@/public/profile/training.svg';
import Achievements from '@/public/profile/achievements.svg';
import Gold from '@/public/profile/gold.svg';
import Silver from '@/public/profile/silver.svg';
import Bronze from '@/public/profile/bronze.svg';
import ProfileDiscussion from '../ProfileDiscussionContainer/ProfileDiscussionContainer';
import styles from './ProfileContainer.module.scss';

const trainingData = [
   {
      index: 1,
      name: `1`,
      exercises: `2`,
      volume: `3`,
      date: `4`,
      time: `5`,
   },
   {
      index: 1,
      name: `1`,
      exercises: `2`,
      volume: `3`,
      date: `4`,
      time: `5`,
   },
   {
      index: 1,
      name: `1`,
      exercises: `2`,
      volume: `3`,
      date: `4`,
      time: `5`,
   },
];

const trainingColumns = [
   {
      Header: `INDEX`,
      accessor: `index` as const,
   },
   {
      Header: `NAME`,
      accessor: `name` as const,
   },

   {
      Header: `EXERCISES`,
      accessor: `exercises` as const,
   },
   {
      Header: `VOLUME`,
      accessor: `volume` as const,
   },
   {
      Header: `DATE`,
      accessor: `date` as const,
   },
   {
      Header: `TIME`,
      accessor: `time` as const,
   },
];

const recipesData = [
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

const recipeColumns = [
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

const name = `Dennis Buk`;
const tag = `@Hickari`;

const ProfileContainer = () => {
   const [showPage, setShowPage] = useState(0);
   const [follow, setFollow] = useState(`Follow`);

   const followFunction = () => setFollow(`Followed`);

   return (
      <div className={styles.Container}>
         <div className={styles.imageContainer}>
            <Image
               src="/profile/banner.jpg"
               alt="Picture of the author"
               layout="fill"
               objectFit="cover"
               className={styles.background}
            />
         </div>
         <div className={styles.botContainer}>
            <div className={styles.profileContainer}>
               <div className={styles.mobileWrapper}>
                  <div className={styles.avatar}>
                     <Image src="/profile/avatar.png" alt="Picture of the author" layout="fill" objectFit="cover" />
                  </div>
                  <div className={styles.name}>
                     <p>{name}</p>
                  </div>
                  <div className={styles.tag}>
                     <p>{tag}</p>
                  </div>
                  <div>
                     <Button
                        size="small"
                        leftIcon={<Follow className={styles.icon} />}
                        borderRadius={5}
                        variant="ghost-primary"
                        onClick={() => followFunction()}
                     >
                        {follow}
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
            </div>
            <div className={styles.rightBox}>
               <div className={styles.menuContainer}>
                  <p className={styles.menuWrapper}>
                     <button className={styles.menuButton} onClick={() => setShowPage(0)}>
                        <Discussion className={cx(styles.menuIcon, showPage === 0 && styles.activeMenu)} />
                        <span className={cx(styles.menuText, showPage === 0 && styles.activeText)}>Discussion</span>
                     </button>
                  </p>
                  <p className={styles.menuWrapper}>
                     <p className={styles.menuWrapper}>
                        <button className={styles.menuButton} onClick={() => setShowPage(1)}>
                           <Training className={cx(styles.menuIcon, showPage === 1 && styles.activeMenu)} />
                           <span className={cx(styles.menuText, showPage === 1 && styles.activeText)}>Training</span>
                        </button>
                     </p>
                  </p>
                  <p className={styles.menuWrapper}>
                     <p className={styles.menuWrapper}>
                        <button
                           className={cx(styles.menuButton, showPage === 2 && styles.active)}
                           onClick={() => setShowPage(2)}
                        >
                           <Achievements className={cx(styles.menuIcon, showPage === 2 && styles.activeMenu)} />
                           <span className={cx(styles.menuText, showPage === 2 && styles.activeText)}>
                              Achievements
                           </span>
                        </button>
                     </p>
                  </p>
                  <p className={styles.menuWrapper}>
                     <p className={styles.menuWrapper}>
                        <button className={styles.menuButton} onClick={() => setShowPage(3)}>
                           <Recipes className={cx(styles.menuIcon, showPage === 3 && styles.activeMenu)} />
                           <span className={cx(styles.menuText, showPage === 3 && styles.activeText)}>Recipes</span>
                        </button>
                     </p>
                  </p>
               </div>
               {showPage === 0 && <ProfileDiscussion />}
               {showPage === 1 && (
                  <div className={styles.tabContainer}>
                     <Table
                        hasGlobalFilter
                        hasPagination
                        isSortable
                        isEquallyGrow
                        columns={trainingColumns}
                        data={trainingData}
                     />
                  </div>
               )}
               {showPage === 2 && (
                  <div className={styles.tabContainer}>
                     <div className={styles.wrapper}>
                        <div className={styles.firstAchiv}>
                           <div>
                              <Gold className={styles.medal} />
                           </div>
                           <div className={styles.boxes}>
                              <div className={styles.boxWrapper}>
                                 <div className={styles.smallBlueBox}>1</div>
                                 <div className={styles.smallBlueBox}>2</div>
                              </div>
                              <div className={styles.boxWrapper}>
                                 <div className={styles.smallRightBlueBox}>3</div>
                                 <div className={styles.smallRightBlueBox}>4</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className={styles.wrapper}>
                        <div className={styles.secondAchiv}>
                           <div>
                              <Silver className={styles.medal} />
                           </div>
                           <div className={styles.boxes}>
                              <div className={styles.boxWrapper}>
                                 <div className={styles.smallDarkerBlueBox}>1</div>
                                 <div className={styles.smallDarkerBlueBox}>2</div>
                              </div>
                              <div className={styles.boxWrapper}>
                                 <div className={styles.smallDarkRight}>3</div>
                                 <div className={styles.smallDarkRight}>4</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className={styles.wrapper}>
                        <div className={styles.tripleAchiv}>
                           <div>
                              <Bronze className={styles.medal} />
                           </div>
                           <div className={styles.boxes}>
                              <div className={styles.boxWrapper}>
                                 <div className={styles.smallDarkest}>1</div>
                                 <div className={styles.smallDarkest}>2</div>
                              </div>
                              <div className={styles.boxWrapper}>
                                 <div className={styles.smallRightDarkest}>3</div>
                                 <div className={styles.smallRightDarkest}>4</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
               {showPage === 3 && (
                  <div className={styles.tabContainer}>
                     <Table
                        hasGlobalFilter
                        hasPagination
                        isSortable
                        isEquallyGrow
                        columns={recipeColumns}
                        data={recipesData}
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
export default ProfileContainer;
