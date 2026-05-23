import NavLink from "@/components/controls/NavLink/NavLink";
import { NAVIGATION_ITEMS } from "@/config/navigation.config";

import "./NavBar.styles.scss";

const BASE_CLASS = "nav-bar";

const NavBar = () => {
  return (
    <nav className={BASE_CLASS}>
      {NAVIGATION_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} />
      ))}
    </nav>
  );
};
export default NavBar;
