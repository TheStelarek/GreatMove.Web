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
         Since 2014 we strive to be the leading company in the cleaning industry delivering quality services at
         reasonable price
      </h5>
      <div className={styles.descWrapper}>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptas eveniet quos. Quisquam accusamus eius
            reiciendis maxime fugiat beatae, nostrum veniam labore odit quasi magni accusantium repellat. Porro, tempora
            odit?
         </p>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptas eveniet quos. Quisquam accusamus eius
            reiciendis maxime fugiat beatae, nostrum veniam labore odit quasi magni accusantium repellat. Porro, tempora
            odit?
         </p>
      </div>
   </div>
);

export default About;

About.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
