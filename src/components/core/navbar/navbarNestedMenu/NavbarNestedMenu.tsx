import Link from 'next/link';
import styles from '@/components/core/navbar/navbarNestedMenu/NavbarNestedMenu.module.scss';
import DynamicIcon from '@/components/core/dynamicIcon/DynamicIcon';
import { PageRoute } from '../navbarData';

interface NavbarNestedMenuProps {
  mainRoute: string;
  label: string;
  nested: PageRoute[] | undefined;
  hideMenu: () => void;
}

const NavbarNestedMenu: React.FC<NavbarNestedMenuProps> = ({
  label: title,
  nested,
  mainRoute,
  hideMenu,
}) => (
  <div className={styles.nestedMenu}>
    <p className={styles.nestedMenuTitle}>{title}</p>
    <ul className={styles.nestedMenuList}>
      {nested &&
        nested.length > 0 &&
        nested.map(({ route, label, description }) => (
          <li className={styles.nestedMenuItem} key={route}>
            <Link href={`${mainRoute}/${route}`}>
              <button type="button" onClick={hideMenu}>
                <span className={styles.icon}>
                  <DynamicIcon name={label} />
                </span>
                <div className={styles.info}>
                  {label}
                  <p className={styles.description}>{description}</p>
                </div>
              </button>
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

export default NavbarNestedMenu;
