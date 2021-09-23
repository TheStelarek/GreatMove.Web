import Link from 'next/link';
import { useState } from 'react';
import cx from 'classnames';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector, logout } from '@/store/auth/AuthSlice';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [showHamburger, setShowHamburger] = useState(false);
  const { isLoggedIn } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const showMenu = () => setShowHamburger(!showHamburger);
  const hideMenu = () => setShowHamburger(false);
  const logoutUser = () => {
    dispatch(logout());
    hideMenu();
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
        <div className={styles.auth}>
          {isLoggedIn ? (
            <button type="button" onClick={logoutUser} onKeyPress={logoutUser}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button type="button" onClick={hideMenu} onKeyPress={hideMenu}>
                  Sign in
                </button>
              </Link>
              <Link href="/register">
                <button type="button" onClick={hideMenu} onKeyPress={hideMenu}>
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
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
