"use client";

import { useEffect, useState } from "react";
import HeaderLeft from "@/components/common/Header/parts/HeaderLeft/HeaderLeft";
import HeaderRight from "@/components/common/Header/parts/HeaderRight/HeaderRight";
import NavBar from "@/components/common/Header/parts/NavBar/NavBar";
import { cn } from "@/lib/utils/cn";

import "./Header.styles.scss";

const BASE_CLASS = "header";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(BASE_CLASS, { "-scrolled": scrolled })} style={{ viewTransitionName: "site-header" }}>
      <HeaderLeft />
      <NavBar />
      <HeaderRight />
    </header>
  );
};

export default Header;
