"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useHash from "@/app/hooks/useHash";

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
  const hash = useHash();
  const router = useRouter();
  const pathName = usePathname();
  const isHomepage = pathName === "/";

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
    if (isHomepage) {
      const defaultSlug = navItems[0].slug;

      if (!hash) {
        router.push(defaultSlug);
      } else {
        router.push(hash);
      }
    }
  }, [hash, pathName]);

  useEffect(() => {
    if (isMenuVisible) {
      document?.body.classList.add("scroll-lock");
    } else {
      document?.body.classList.remove("scroll-lock");
    }
  }, [isMenuVisible]);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setHasMobileNav(true);
    } else {
      setHasMobileNav(false);
    }
  }, []);

  return (
    <div className={`${hasMobileNav ? "px-[20px] py-[10px]" : ""}`}>
      <nav
        aria-label={navigationType}
        className={`
          nav-main fixed top-[0] left-[0] bottom-[0] lg:static w-full lg:w-auto p-[8%] bg-white
          h-[100%] opacity-[0] lg:opacity-[100%] transform-[translateX(100%)] lg:transform-[translateX(0)]
          `}
      >
        {navItems.length > 0 && (
          <ul>
            {navItems.map((item) => {
              const isActiveUrl = isHomepage
                ? hash === item.slug
                : pathName.split("/")[1] === item.slug;

              return (
                <NavigationItem
                  key={item.id}
                  item={item}
                  isActive={isActiveUrl}
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
