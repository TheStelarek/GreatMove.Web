import Link from 'next/link';
import cx from 'classnames';
import styles from '@/components/core/navbar/navbarNestedMenu/NavbarNestedMenu.module.scss';
import DynamicIcon from '@/components/core/dynamicIcon/DynamicIcon';
import { NavbarVariants, PageRoute } from '@/components/core/navbar/NavbarTypes';

interface NavbarNestedMenuProps {
   mainRoute: string;
   label: string;
   nested: PageRoute[] | undefined;
   hideMenu: () => void;
   navbarVariant?: NavbarVariants;
}

const NavbarNestedMenu: React.FC<NavbarNestedMenuProps> = ({
   label: title,
   nested,
   mainRoute,
   hideMenu,
   navbarVariant: variant,
}) => (
   <div className={cx(styles.nestedMenu, styles[`nestedMenu-${variant}`])}>
      <p className={styles.nestedMenuTitle}>{title}</p>
      <ul className={styles.nestedMenuList}>
         {nested &&
            nested.length > 0 &&
            nested.map(({ route, label, description }) => (
               <li className={styles.nestedMenuItem} key={route}>
                  <Link href={`${mainRoute}/${route}`}>
                     <button className={styles.nestedMenuItemButton} type="button" onClick={hideMenu}>
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
