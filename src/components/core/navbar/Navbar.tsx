import Link from 'next/link';
import { useState } from 'react';
import cx from 'classnames';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [showHamburger, setShowHamburger] = useState(false);

  const showMenu = () => {
    setShowHamburger(!showHamburger);
  };

  const hideMenu = () => {
    setShowHamburger(false);
  };

  return (
    <nav className={styles.navbar}>
      <ul
        className={cx(
          styles.navMenu,
          showHamburger ? styles.navMenuActive : null,
        )}
      >
        <li className={styles.navItem}>
          <Link href="/">
            <button type="button" onClick={hideMenu} onKeyPress={hideMenu}>
              Home
            </button>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/recipe">
            <button type="button" onClick={hideMenu} onKeyPress={hideMenu}>
              Recipes
            </button>
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className={cx(
          styles.hamburger,
          showHamburger ? styles.hamburgerActive : null,
        )}
        onClick={showMenu}
        onKeyPress={hideMenu}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>
    </nav>
  );
}
