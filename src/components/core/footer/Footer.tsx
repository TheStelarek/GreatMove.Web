import Link from 'next/link';
import styles from '@/components/core/footer/Footer.module.scss';
import ArrowUpLeft from '@/public/footer/arrowUpLeft.svg';
import Facebook from '@/public/footer/facebook.svg';
import Instagram from '@/public/footer/instagram.svg';
import Twitter from '@/public/footer/twitter.svg';

const Footer = () => (
   <footer className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
         <div className={styles.section}>
            <div className={styles.description}>
               <ArrowUpLeft className={styles.arrowIcon} />
               <p className={styles.seoText}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim explicabo id laudantium quam
                  consectetur ipsum ratione fuga illo quaerat magnam. Iste rem nam pariatur expedita nostrum incidunt in
                  ad eaque?
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
               <span className={styles.credensionals}>© 2021 GreatMove</span>/<Link href="/">privacy policy</Link>
            </div>
         </div>
      </div>
   </footer>
);

export default Footer;
