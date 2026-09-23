import MobileMenu from "@/components/common/Header/parts/MobileMenu/MobileMenu";
import Logo from "@/components/common/Logo/Logo";

import "./HeaderLeft.styles.scss";

const BASE_CLASS = "header-left";

const HeaderLeft = () => {
  return (
    <div className={BASE_CLASS}>
      <MobileMenu />
      <Logo />
    </div>
  );
};
export default HeaderLeft;
