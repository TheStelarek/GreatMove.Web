import { ReactElement, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import More from '@/public/profile/more.svg';
import Heart from '@/public/profile/heart.svg';
import Comment from '@/public/profile/comment.svg';
import styles from './Profile.module.scss';

const Profile = () => (
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
                        Achivments
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
            <div className={styles.commentContainer}>
               <div className={styles.commentBox}>
                  <div className={styles.headerComment}>
                     <div className={styles.commentAvatar}>
                        <Image src="/profile/avatar.png" alt="Picture of the author" layout="fill" objectFit="cover" />
                     </div>
                     <div className={styles.commentName}>
                        <p>Dennis Buk</p>
                     </div>
                     <div className={styles.commentTag}>
                        <p className={styles.commentTagText}>@Hickari</p>
                     </div>
                     <div className={styles.commentDate}>
                        <p className={styles.commentDate}>32 min</p>
                     </div>

                     <div className={styles.commentMenu}>
                        <More className={styles.commentIcon} />
                     </div>
                  </div>
                  <div className={styles.commentText}>
                     <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque nibh ligula, at egestas
                        tellus efficitur eu. Nunc id leo pharetra erat vehicula feugiat eu vel nibh. Mauris suscipit
                        tortor libero, vel dictum neque ornare sit amet.
                     </span>
                  </div>
                  <div className={styles.commentFooter}>
                     <div className={styles.commentLike}>
                        <Heart className={styles.commentIcon} />
                        <p>123</p>
                     </div>
                     <div className={styles.commentWrapper}>
                        <Comment className={styles.commentIcon} />
                        <p>123</p>
                     </div>
                  </div>
               </div>
               <div className={styles.commentBox}>
                  <div className={styles.headerComment}>
                     <div className={styles.commentAvatar}>
                        <Image src="/profile/avatar.png" alt="Picture of the author" layout="fill" objectFit="cover" />
                     </div>
                     <div className={styles.commentName}>
                        <p>Dennis Buk</p>
                     </div>
                     <div className={styles.commentTag}>
                        <p className={styles.commentTagText}>@Hickari</p>
                     </div>
                     <div className={styles.commentDate}>
                        <p className={styles.commentDate}>32 min</p>
                     </div>

                     <div className={styles.commentMenu}>
                        <More className={styles.commentIcon} />
                     </div>
                  </div>
                  <div className={styles.commentText}>
                     <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur rutrum dui ac auctor.
                        Quisque quis massa congue quam efficitur eleifend a nec ante. Etiam a ex iaculis, vulputate nisi
                        eget, venenatis leo. Fusce sed interdum massa. Donec vel convallis nunc. Pellentesque volutpat
                        lectus quam, ac hendrerit leo rhoncus et ...
                     </span>
                     <div>
                        <Button size="small" borderRadius={5} variant="ghost-primary">
                           More...
                        </Button>
                     </div>
                  </div>
                  <div className={styles.commentFooter}>
                     <div className={styles.commentLike}>
                        <Heart className={styles.clickedHeart} />
                        <p>78</p>
                     </div>
                     <div className={styles.commentWrapper}>
                        <Comment className={styles.commentIcon} />
                        <p>41</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
);
export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
   return <Layout fullWidth>{page}</Layout>;
};
