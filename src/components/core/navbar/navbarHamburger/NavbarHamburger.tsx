import cx from 'classnames';
import styles from '@/components/core/navbar/navbarHamburger/NavbarHamburger.module.scss';

interface NavbarHamburgerProps {
  toggleMenu: () => void;
  isHamburgerActive: boolean;
}
const NavbarHamburger: React.FC<NavbarHamburgerProps> = ({
  toggleMenu,
  isHamburgerActive,
}) => (
  <button
    type="button"
    className={cx(
      styles.hamburger,
      isHamburgerActive && styles.hamburgerActive,
    )}
    onClick={toggleMenu}
    tabIndex={2}
  >
    <span className={styles.bar} />
    <span className={styles.bar} />
  </button>
);

export default NavbarHamburger;
