import Nav from "@/components/header/nav";
import { NavItem } from "@/components/header/types";

const MainNav: React.FC = () => {
  const navItems: NavItem[] = [
    {
      label: "Home",
      href: `/`,
    },
  ];

  return <Nav items={navItems} />;
};

export default MainNav;
