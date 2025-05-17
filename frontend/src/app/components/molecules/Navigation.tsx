"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import useHash from "@/app/hooks/useHash";
import useScrollLock from "@/app/hooks/useScrollLock";

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

  const handleHamburgerClick = () => {
    setIsMenuVisible(true);
    document.body.classList.add("scroll-lock");
  };

  const handleCloseClick = () => {
    setIsMenuVisible(false);
  };

  useEffect(() => {
    if (isHomepage) {
      const defaultSlug = navItems[0].slug;

      if (hash === "") {
        router.push(defaultSlug);
      }
    }
  }, [hash, isHomepage, router, navItems]);

  useEffect(() => {
    setIsMenuVisible(false);
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
        className={`fixed top-[0] left-[0] bottom-[0] lg:static 
        ${
          isMenuVisible
            ? "transform-[translateX(0)]"
            : "transform-[translateX(100%)]"
        } 
                    lg:transform-[translateX(0)] w-full lg:w-auto p-[8%] bg-white`}
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
                />
              );
            })}
          </ul>
        )}
        {hasMobileNav && isMenuVisible && (
          <button
            type="button"
            className="absolute top-[10px] left-[10px]"
            onClick={handleCloseClick}
          >
            <IoCloseSharp fill="#000" className="h-[20px] w-[20px]" />
          </button>
        )}
      </nav>
      {hasMobileNav && (
        <button type="button" onClick={handleHamburgerClick}>
          <GiHamburgerMenu fill="#000" className="h-[20px] w-[20px]" />
        </button>
      )}
    </div>
  );
}
