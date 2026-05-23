import HeaderLeft from "@/components/common/Header/parts/HeaderLeft/HeaderLeft";
import HeaderRight from "@/components/common/Header/parts/HeaderRight/HeaderRight";
import NavBar from "@/components/common/Header/parts/NavBar/NavBar";

import "./Header.styles.scss";

const BASE_CLASS = "header";

const Header = () => {
  return (
    <header className={BASE_CLASS}>
      <HeaderLeft />
      <NavBar />
      <HeaderRight />
    </header>
  );
};
export default Header;
