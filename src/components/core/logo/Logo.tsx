import cx from 'classnames';
import styles from '@/components/core/logo/Logo.module.scss';
import FullLogo from '@/public/logo/greatmove-full.svg';
import IconLogo from '@/public/logo/greatmove-icon.svg';
import TextLogo from '@/public/logo/greatmove-text.svg';

type LogoVariants = 'full' | 'icon' | 'text';
type LogoColor = 'blue' | 'purple' | 'white' | 'black';

interface LogoProps {
   variant?: LogoVariants;
   color?: LogoColor;
}

const Logo: React.FC<LogoProps> = ({ variant = `full`, color = `black` }) => (
   <>
      {variant === `full` && <FullLogo className={cx(styles.logo, styles[`logo-${color}`])} />}
      {variant === `icon` && <IconLogo className={cx(styles.logo, styles[`logo-${color}`])} />}
      {variant === `text` && <TextLogo className={cx(styles.logo, styles[`logo-${color}`])} />}
   </>
);

export default Logo;
