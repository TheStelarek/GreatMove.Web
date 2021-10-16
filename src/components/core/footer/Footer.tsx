import styles from '@/components/core/footer/Footer.module.scss';
import ArrowUpLeft from '@/public/footer/arrowUpLeft.svg';
import Facebook from '@/public/footer/facebook.svg';
import Instagram from '@/public/footer/instagram.svg';
import Twitter from '@/public/footer/twitter.svg';
import Link from 'next/link';

const Footer = () => (
  <footer className={styles.footerContainer}>
    <div className={styles.footerWrapper}>
      <div className={styles.sectionWrapper}>
        <div className={styles.description}>
          <ArrowUpLeft className={styles.arrowIcon} />
          <p className={styles.seoText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
            explicabo id laudantium quam consectetur ipsum ratione fuga illo
            quaerat magnam. Iste rem nam pariatur expedita nostrum incidunt in
            ad eaque?
          </p>
        </div>
      </div>
      <div className={styles.sectionWrapper}>
        <ul className={styles.linksList}>
          <li className={styles.link}>Faq</li>
          <li className={styles.link}>About us</li>
          <li className={styles.link}>Contact</li>
        </ul>
      </div>
      <div className={styles.sectionWrapper}>
        <div className={styles.socials}>
          <Facebook className={styles.socialIcon} />
          <Instagram className={styles.socialIcon} />
          <Twitter className={styles.socialIcon} />
        </div>
        <div className={styles.copyrights}>
          <span className={styles.credensionals}>© 2021 GreatMove</span>/
          <Link href="/">privacy policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;