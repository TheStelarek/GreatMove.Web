import Link from 'next/link';
import { SetStateAction, useState, useEffect } from 'react';
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
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector } from '@/store/auth/AuthSlice';
import Arrow from '@/public/navbar/expand-arrow.svg';
import DefaultAvatar from '@/public/navbar/default-avatar.svg';
import NavbarNestedMenu from '@/components/core/navbar/navbarNestedMenu/NavbarNestedMenu';
import NavbarHamburger from '@/components/core/navbar/navbarHamburger/NavbarHamburger';
import {
  NavbarVariants,
  NestedMenuTypes,
} from '@/components/core/navbar/NavbarTypes';
import Logo from '@/components/core/logo/Logo';

interface NavbarProps {
  variant?: NavbarVariants;
  boxShadow?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ variant, boxShadow = true }) => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<NestedMenuTypes | ''>(``);
  const { isLoggedIn } = useAppSelector(authSelector);

  const toggleNestedMenu = (expand: SetStateAction<'' | NestedMenuTypes>) =>
    expandedMenu === expand ? setExpandedMenu(``) : setExpandedMenu(expand);

  const hideMenu = () => {
    setShowHamburger(false);
    setExpandedMenu(``);
  };

  useEffect(() => {
    document.body.style.overflow = showHamburger ? `hidden` : `scroll`;
  }, [showHamburger]);

  return (
    <nav
      className={cx(
        styles.navbar,
        boxShadow && styles.navbarBoxShadow,
        styles[`navbar-${variant}`],
      )}
    >
      <Link href="/">
        <button
          className={styles.logoWrapper}
          type="button"
          onClick={hideMenu}
          tabIndex={1}
        >
          <Logo color={variant ? `white` : `black`} />
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
              navbarVariant={variant}
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
        navbarVariant={variant}
      />
    </nav>
  );
};

export default Navbar;
