import Link from 'next/link';
import styles from '@/components/core/footer/Footer.module.scss';
import ArrowUpLeft from '@/public/icons/arrowUpLeft.svg';
import Facebook from '@/public/icons/facebook-solid.svg';
import Instagram from '@/public/icons/instagram-solid.svg';
import Twitter from '@/public/icons/twitter-solid.svg';

const Footer = () => (
   <footer className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
         <div className={styles.section}>
            <div className={styles.description}>
               <ArrowUpLeft className={styles.arrowIcon} />
               <p className={styles.seoText}>
                  Lead a healthy diet with us, create a variety of recipes. Create specialized training plans such as
                  bodybuilding, powerlifting or conditioning workout plan. Wondering how to lose weight? Ask our experts
                  and achieve your goals!
               </p>
            </div>
         </div>
         <div className={styles.section}>
            <ul className={styles.linksList}>
               <li className={styles.link}>
                  <Link href="/faq">Faq</Link>
               </li>
               <li className={styles.link}>
                  <Link href="/about">About us</Link>
               </li>
               <li className={styles.link}>
                  <Link href="/contact">Contact </Link>
               </li>
            </ul>
         </div>
         <div className={styles.section}>
            <div className={styles.socials}>
               <Facebook className={styles.socialIcon} />
               <Instagram className={styles.socialIcon} />
               <Twitter className={styles.socialIcon} />
            </div>
            <div className={styles.copyrights}>
               <span className={styles.credensionals}>© 2022 GreatMove</span>/ privacy policy
            </div>
         </div>
      </div>
   </footer>
);

export default Footer;
