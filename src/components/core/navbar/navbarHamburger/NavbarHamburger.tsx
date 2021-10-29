import cx from 'classnames';
import styles from '@/components/core/navbar/navbarHamburger/NavbarHamburger.module.scss';
import { NavbarVariants } from '@/components/core/navbar/NavbarTypes';

interface NavbarHamburgerProps {
   toggleMenu: () => void;
   isHamburgerActive: boolean;
   navbarVariant?: NavbarVariants;
}
const NavbarHamburger: React.FC<NavbarHamburgerProps> = ({ toggleMenu, isHamburgerActive, navbarVariant: variant }) => (
   <button
      type="button"
      className={cx(styles.hamburger, isHamburgerActive && styles.hamburgerActive, styles[`hamburger-${variant}`])}
      onClick={toggleMenu}
      tabIndex={2}
   >
      <span className={styles.bar} />
      <span className={styles.bar} />
   </button>
);

export default NavbarHamburger;
