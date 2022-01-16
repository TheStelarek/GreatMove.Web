import { useState } from 'react';
import { useRouter } from 'next/router';
import {
   FacebookShareButton,
   FacebookIcon,
   TwitterShareButton,
   TwitterIcon,
   WhatsappShareButton,
   WhatsappIcon,
   TelegramShareButton,
   TelegramIcon,
   RedditShareButton,
   RedditIcon,
   EmailShareButton,
   EmailIcon,
} from 'next-share';
import styles from '@/features/recipe/components/recipe/recipeShare/RecipeShare.module.scss';
import Share from '@/public/recipe/share.svg';
import Copy from '@/public/recipe/copy.svg';

const RecipeShare = () => {
   const [show, setShow] = useState(false);
   const router = useRouter();

   const toggle = () => setShow((prevState) => !prevState);
   const link = `https://great-move-web.vercel.app${router.asPath}`;
   const copy = () => navigator.clipboard.writeText(link);

   return (
      <div className={styles.shareContainer}>
         <div className={styles.shareSocials}>
            <button className={styles.actionBtn} onClick={toggle}>
               <Share className={styles.shareIcon} />
            </button>
            <div
               className={styles.socials}
               style={{
                  display: show ? `block` : `none`,
               }}
            >
               <div className={styles.socialWrapper}>
                  <button className={styles.copyBtn} onClick={copy}>
                     <Copy />
                  </button>
               </div>
               <div className={styles.socialWrapper}>
                  <FacebookShareButton url={link} hashtag="#recipe" className={styles.outline}>
                     <FacebookIcon className={styles.outline} size={32} round />
                  </FacebookShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <TwitterShareButton url={link}>
                     <TwitterIcon size={32} round />
                  </TwitterShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <WhatsappShareButton url={link} separator=":: ">
                     <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <TelegramShareButton url={link}>
                     <TelegramIcon size={32} round />
                  </TelegramShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <RedditShareButton url={link}>
                     <RedditIcon size={32} round />
                  </RedditShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <EmailShareButton url={link} subject="Recipe">
                     <EmailIcon size={32} round />
                  </EmailShareButton>
               </div>
            </div>
         </div>
      </div>
   );
};
export default RecipeShare;
