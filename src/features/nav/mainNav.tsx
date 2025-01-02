"use client";

import Nav from "@/components/header/nav";
import { NavItem } from "@/components/header/types";
import { WithLocale } from "@/types";

const translations = {
  en: {
    home: "Home",
  },
  pt: {
    home: "Inicio",
  },
};

const MainNav: React.FC<WithLocale> = ({ locale }) => {
  const keys = translations[locale];

  const navItems: NavItem[] = [
    {
      label: keys.home,
      href: `/${locale}/`,
    },
  ];

  return <Nav items={navItems} />;
};

export default MainNav;
