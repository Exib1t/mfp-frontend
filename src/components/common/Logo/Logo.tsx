import Link from "next/link";
import "./Logo.styles.scss";

const BASE_CLASS = "logo";

const Logo = () => {
  return (
    <Link href="/" className={BASE_CLASS}>
      <span className={`${BASE_CLASS}_mark`}>✦</span>
      <span className={`${BASE_CLASS}_text`}>
        My Fairy<strong> Place</strong>
      </span>
    </Link>
  );
};

export default Logo;
