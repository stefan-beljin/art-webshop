"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import { useActiveSection } from "@/app/hooks/useActiveSection";

import NavItemModel from "@/app/models/navItemModel";

import NavigationItem from "../atoms/NavigationItem";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

interface NavigationProps {
  navItems: NavItemModel[];
  navigationType: string;
}

export default function Navigation({
  navItems,
  navigationType,
}: NavigationProps) {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [hasMobileNav, setHasMobileNav] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);
  const pathName = usePathname();
  const activeSectionIDs = navItems.map((item) => item.slug?.split("#")[1]);
  const activeSection = useActiveSection(activeSectionIDs);

  const showMenu = () => {
    gsap.fromTo(
      ".nav-main",
      { opacity: 0, translateX: "100%" },
      { opacity: 1, translateX: "0%", duration: 0.5 }
    );
  };

  const hideMenu = () => {
    gsap.fromTo(
      ".nav-main",
      { opacity: 1, translateX: "0%" },
      { opacity: 0, translateX: "100%", duration: 0.5 }
    );
  };

  const handleHamburgerClick = () => {
    setIsMenuVisible(true);
    showMenu();
  };

  const handleCloseClick = () => {
    setIsMenuVisible(false);
    hideMenu();
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setHasMobileNav(true);
    } else {
      setHasMobileNav(false);
    }
  }, []);

  return (
    <div
      className={`relative z-99 ${hasMobileNav ? "px-[20px] py-[10px]" : ""}`}
    >
      <nav
        aria-label={navigationType}
        className={`
          nav-main fixed top-0 left-0 bottom-0 lg:static w-full lg:w-auto p-[8%] bg-white h-full
          transition-all duration-300
          ${hydrated ? "" : "hidden lg:block"}
          ${
            hasMobileNav
              ? isMenuVisible
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-full pointer-events-none"
              : "opacity-100 translate-x-0"
          }
        `}
      >
        {navItems.length > 0 && (
          <ul>
            {navItems.map((item) => {
              let isActive = false;

              if (item.slug.startsWith("#")) {
                isActive = activeSection === item.slug.split("#")[1];
              } else {
                isActive = pathName === item.slug;
              }

              return (
                <NavigationItem
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  handleCloseMenu={handleCloseClick}
                  isMobile={hasMobileNav}
                />
              );
            })}
          </ul>
        )}
        {hasMobileNav && isMenuVisible && (
          <button
            type="button"
            className="absolute top-[10px] right-[20px]"
            onClick={handleCloseClick}
          >
            <IoCloseSharp fill="#000" className="h-[20px] w-[20px]" />
          </button>
        )}
      </nav>
      {hasMobileNav && (
        <button
          type="button"
          className="block ml-auto"
          onClick={handleHamburgerClick}
        >
          <GiHamburgerMenu fill="#000" className="h-[20px] w-[20px]" />
        </button>
      )}
    </div>
  );
}
