import { MouseEventHandler } from "react";
import { Link } from "../link";
import { Text } from "../text";
import styles from "./navItem.module.css";
import { NavItem as NavItemType } from "./types";

type NavItemProps = {
  item: NavItemType;
  onNav: MouseEventHandler<HTMLAnchorElement>;
};

const NavItem: React.FC<NavItemProps> = ({ item, onNav }) => {
  const { label, href } = item;

  const navItemContent = href ? (
    <Link href={href} onClick={onNav}>
      <Text size={2}>{label}</Text>
    </Link>
  ) : (
    <Text size={2}>{label}</Text>
  );

  return (
    <div className={styles.navItem}>
      <div className={styles.navItemContent} tabIndex={href ? -1 : 0}>
        {navItemContent}
      </div>
    </div>
  );
};

export default NavItem;
