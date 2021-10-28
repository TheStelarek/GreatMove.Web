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
  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }

  const router = useRouter();

  console.log();

  const [copySuccess, setCopySuccess] = useState(``);

  const copy = async () => {
    await navigator.clipboard.writeText(`localhost:3000${router.pathname}`);
  };

  return (
    <div className={styles.shareContainer}>
      <div className={styles.icons}>
        <div className={styles.share}>
          <button type="button" className={styles.button} onClick={toggle}>
            <Share className={styles.icon} />
          </button>
          <div
            className={styles.socials}
            style={{
              display: showMe ? `block` : `none`,
            }}
          >
            <div className={styles.copyContainer}>
              <button type="button" className={styles.copy} onClick={copy}>
                <Copy />
              </button>
            </div>
            <div className={styles.copyContainer}>
              <FacebookShareButton
                url="https://github.com/next-share"
                quote="next-share is a social share buttons for your next React apps."
                hashtag="#nextshare"
                className={styles.outline}
              >
                <FacebookIcon className={styles.outline} size={32} round />
              </FacebookShareButton>
            </div>
            <div>
              <TwitterShareButton
                url="https://github.com/next-share"
                title="next-share is a social share buttons for your next React apps."
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <div>
              <WhatsappShareButton
                url="https://github.com/next-share"
                title="next-share is a social share buttons for your next React apps."
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
            <div>
              <FacebookMessengerShareButton
                url="https://github.com/next-share"
                appId=""
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
            </div>
            <div>
              <TelegramShareButton
                url="https://github.com/next-share"
                title="next-share is a social share buttons for your next React apps."
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>
            <div>
              <RedditShareButton
                url="https://github.com/next-share"
                title="next-share is a social share buttons for your next React apps."
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>
            <div>
              <EmailShareButton
                url="https://github.com/next-share"
                subject="Next Share"
                body="body"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </div>
        </div>
        <div className={styles.print}>
          <button type="button" className={styles.button}>
            <Print className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default RecipeShare;
