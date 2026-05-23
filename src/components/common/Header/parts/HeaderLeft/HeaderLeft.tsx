import Logo from "@/components/common/Logo/Logo";

import "./HeaderLeft.styles.css";

const BASE_CLASS = "header-left";

const HeaderLeft = () => {
  return (
    <div className={BASE_CLASS}>
      <Logo />
    </div>
  );
};
export default HeaderLeft;
