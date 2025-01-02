import CloseMenuIcon from "@mui/icons-material/Close";
import OpenMenuIcon from "@mui/icons-material/Menu";
import cx from "classnames";
import { MouseEventHandler, useState } from "react";
import { IconButton } from "../button/icon";
import styles from "./nav.module.css";
import NavItem from "./navItem";
import { NavItem as NavItemType } from "./types";

type NavProps = {
  items: NavItemType[];
};

const Nav: React.FC<NavProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav: MouseEventHandler<HTMLAnchorElement> = (e) => {
    setIsOpen(false);
    e.currentTarget?.blur?.();
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const menuLabel = isOpen ? "Fechar" : "Menu";
  const MenuIcon = isOpen ? CloseMenuIcon : OpenMenuIcon;

  return (
    <>
      <nav
        className={cx(styles.nav, {
          [styles.isOpen]: isOpen,
        })}
      >
        {items.map((item, index) => (
          <NavItem
            key={`nav-${index}-${item.label}`}
            item={item}
            onNav={handleNav}
          />
        ))}
      </nav>

      <IconButton
        label={menuLabel}
        size={1}
        onClick={handleClick}
        className={styles.menuButton}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Nav;
