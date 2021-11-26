import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
   FacebookShareButton,
   FacebookIcon,
   TwitterShareButton,
   TwitterIcon,
   WhatsappShareButton,
   WhatsappIcon,
   FacebookMessengerShareButton,
   FacebookMessengerIcon,
   TelegramShareButton,
   TelegramIcon,
   RedditShareButton,
   RedditIcon,
   EmailShareButton,
   EmailIcon,
} from 'next-share';
import styles from '@/components/recipe/recipeShare/RecipeShare.module.scss';
import Share from '@/public/recipe/share.svg';
import Print from '@/public/recipe/print.svg';
import Copy from '@/public/recipe/copy.svg';

const RecipeShare = () => {
   const [show, setShow] = useState(false);
   const router = useRouter();

   const toggle = () => setShow((prevState) => !prevState);
   const copy = () => navigator.clipboard.writeText(`localhost:3000${router.pathname}`);

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
                  <FacebookShareButton
                     url="https://github.com/next-share"
                     hashtag="#nextshare"
                     className={styles.outline}
                  >
                     <FacebookIcon className={styles.outline} size={32} round />
                  </FacebookShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <TwitterShareButton url="https://github.com/next-share">
                     <TwitterIcon size={32} round />
                  </TwitterShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <WhatsappShareButton url="https://github.com/next-share" separator=":: ">
                     <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <FacebookMessengerShareButton url="https://github.com/next-share" appId="">
                     <FacebookMessengerIcon size={32} round />
                  </FacebookMessengerShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <TelegramShareButton url="https://github.com/next-share">
                     <TelegramIcon size={32} round />
                  </TelegramShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <RedditShareButton url="https://github.com/next-share">
                     <RedditIcon size={32} round />
                  </RedditShareButton>
               </div>
               <div className={styles.socialWrapper}>
                  <EmailShareButton url="https://github.com/next-share" subject="Next Share" body="body">
                     <EmailIcon size={32} round />
                  </EmailShareButton>
               </div>
            </div>
         </div>
         <div className={styles.print}>
            <button className={styles.actionBtn}>
               <Print className={styles.printIcon} />
            </button>
         </div>
      </div>
   );
};
export default RecipeShare;
