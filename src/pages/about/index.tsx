import { ReactElement } from 'react';
import styles from '@/pages/about/About.module.scss';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import Info from '@/public/icons/info-solid.svg';

const About = () => (
   <div className={styles.wrapper}>
      <span className={styles.iconWrapper}>
         <Info className={styles.icon} />
      </span>
      <h5 className={styles.heading}>
         GreatMove is the leading app for tracking and conquering your nutrition and fitness goals. We plan to become
         the leading application in our industry in the next 3 years.
      </h5>
      <div className={styles.descWrapper}>
         <p>
            We started Great Move as a small group of programming enthusiasts. Our goal was to make a hobby site that
            fit our requirements, as the current market didn't offer everything we wanted from such a site. We needed it
            to be a site that had all the things we needed to train, instead of being split up into several different
            applications.
         </p>
         <p>
            Always focus on the highest quality of our solutions. Constantly trying to improve our modules in the
            application. We also wanted it to be simple, minimalistic and intuitive so that everyone could easily find
            their way around our site. We always listen to the needs of our users and try to implement the tools they
            need.
         </p>
      </div>
   </div>
);

export default About;

About.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
