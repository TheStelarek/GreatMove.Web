import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import cx from 'classnames';
import styles from '@/components/core/navbar/Navbar.module.scss';
import {
  RECIPES,
  CALCULATORS,
  TRAININGS,
  BLOG,
  MYPROFILE,
  LOGIN,
  REGISTER,
} from '@/components/core/navbar/navbarData';
import { NestedMenuTypes } from '@/components/core/navbar/NestedMenuTypes';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector } from '@/store/auth/AuthSlice';
import Logo from '@/public/logo/greatmove-mobile.svg';
import Arrow from '@/public/navbar/expand-arrow.svg';
import DefaultAvatar from '@/public/navbar/default-avatar.svg';
import NavbarNestedMenu from './navbarNestedMenu/NavbarNestedMenu';
import NavbarHamburger from './navbarHamburger/NavbarHamburger';

const Navbar: React.FC = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<NestedMenuTypes | ''>(``);
  const { isLoggedIn } = useAppSelector(authSelector);

  const toggleNestedMenu = (expand: SetStateAction<'' | NestedMenuTypes>) =>
    expandedMenu === expand ? setExpandedMenu(``) : setExpandedMenu(expand);

  const hideMenu = () => {
    setShowHamburger(false);
    setExpandedMenu(``);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <button
          className={styles.logo}
          type="button"
          onClick={hideMenu}
          tabIndex={1}
        >
          <Logo />
        </button>
      </Link>
      <ul className={cx(styles.navMenu, showHamburger && styles.navMenuActive)}>
        <li className={styles.navMenuItem}>
          <Link href={RECIPES.page.route}>
            <button
              type="button"
              className={styles.navMenuItemButton}
              onClick={hideMenu}
            >
              {RECIPES.page.label}
            </button>
          </Link>
        </li>
        <li className={styles.navMenuItem}>
          <Link href={CALCULATORS.page.route}>
            <button
              type="button"
              className={styles.navMenuItemButton}
              onClick={hideMenu}
            >
              {CALCULATORS.page.label}
            </button>
          </Link>
        </li>
        <li className={styles.navMenuItem}>
          <Link href={BLOG.page.route}>
            <button
              type="button"
              className={styles.navMenuItemButton}
              onClick={hideMenu}
            >
              {BLOG.page.label}
            </button>
          </Link>
        </li>
        <li className={cx(styles.navMenuItem, styles.multiple)}>
          <button
            type="button"
            className={cx(styles.multipleButton, styles.navMenuItemButton)}
            onClick={() => toggleNestedMenu(NestedMenuTypes.trainings)}
          >
            {TRAININGS.page.label}
            <Arrow
              className={cx(
                styles.expandArrow,
                expandedMenu === NestedMenuTypes.trainings && styles.active,
              )}
            />
          </button>
          {expandedMenu === NestedMenuTypes.trainings && (
            <NavbarNestedMenu
              label={TRAININGS.page.label}
              hideMenu={hideMenu}
              mainRoute={TRAININGS.page.route}
              nested={TRAININGS.nested}
            />
          )}
        </li>
        {isLoggedIn ? (
          <li className={cx(styles.navMenuItem, styles.profile)}>
            <Link href={MYPROFILE.page.route}>
              <button
                type="button"
                className={cx(styles.profileButton, styles.navMenuItemButton)}
              >
                <span className={styles.username}>{MYPROFILE.page.label}</span>
                <DefaultAvatar className={styles.avatar} />
              </button>
            </Link>
          </li>
        ) : (
          <li className={cx(styles.navMenuItem, styles.auth)}>
            <Link href={LOGIN.page.route}>
              <button
                className={styles.loginButton}
                type="button"
                onClick={hideMenu}
              >
                {LOGIN.page.label}
              </button>
            </Link>
            <Link href={REGISTER.page.route}>
              <button
                className={styles.registerButton}
                type="button"
                onClick={hideMenu}
              >
                {REGISTER.page.label}
              </button>
            </Link>
          </li>
        )}
      </ul>
      <NavbarHamburger
        toggleMenu={() => setShowHamburger((prevState) => !prevState)}
        isHamburgerActive={showHamburger}
      />
    </nav>
  );
};

export default Navbar;
