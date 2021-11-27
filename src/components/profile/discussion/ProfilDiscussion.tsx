import Image from 'next/image';
import styles from '@/components/profile/discussion/ProfilDiscussion.module.scss';
import More from '@/public/profile/more.svg';
import Heart from '@/public/profile/heart.svg';
import Comment from '@/public/profile/comment.svg';
import Button from '@/components/core/button/Button';

const name = `Dennis Buk`;
const tag = `@Hickari`;
const time = `32 min`;

const ProfileDiscussion = () => (
   <div className={styles.commentContainer}>
      <div className={styles.commentBox}>
         <div className={styles.headerComment}>
            <div className={styles.commentAvatar}>
               <Image src="/profile/avatar.png" alt="Picture of the author" layout="fill" objectFit="cover" />
            </div>
            <div className={styles.commentwrapp}>
               <div className={styles.commentName}>
                  <p>{name}</p>
               </div>
               <div className={styles.commentTag}>
                  <p className={styles.commentTagText}>{tag}</p>
               </div>
            </div>
            <div className={styles.commentDate}>
               <p className={styles.commentDate}>{time}</p>
            </div>

            <div className={styles.commentMenu}>
               <More className={styles.commentIcon} />
            </div>
         </div>
         <div className={styles.commentText}>
            <span>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque nibh ligula, at egestas tellus
               efficitur eu. Nunc id leo pharetra erat vehicula feugiat eu vel nibh. Mauris suscipit tortor libero, vel
               dictum neque ornare sit amet.
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
            <div className={styles.commentwrapp}>
               <div className={styles.commentName}>
                  <p>{name}</p>
               </div>
               <div className={styles.commentTag}>
                  <p className={styles.commentTagText}>{tag}</p>
               </div>
            </div>
            <div className={styles.commentDate}>
               <p className={styles.commentDate}>{time}</p>
            </div>

            <div className={styles.commentMenu}>
               <More className={styles.commentIcon} />
            </div>
         </div>
         <div className={styles.commentText}>
            <span>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur rutrum dui ac auctor. Quisque
               quis massa congue quam efficitur eleifend a nec ante. Etiam a ex iaculis, vulputate nisi eget, venenatis
               leo. Fusce sed interdum massa. Donec vel convallis nunc. Pellentesque volutpat lectus quam, ac hendrerit
               leo rhoncus et ...
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
);
export default ProfileDiscussion;
