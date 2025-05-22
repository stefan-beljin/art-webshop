"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";

import Link from "next/link";
import NavItemModel from "@/app/models/navItemModel";

interface NavigationItemProps {
  item: NavItemModel;
  isActive: boolean;
  handleCloseMenu: () => void;
  isMobile: boolean;
}

export default function NavigationItem({
  item,
  isActive,
  handleCloseMenu,
  isMobile,
}: NavigationItemProps) {
  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (isMobile) {
      handleCloseMenu();
    }

    gsap.registerPlugin(ScrollToPlugin);

    if (item.slug.includes("#")) {
      e.preventDefault();
      const sectionID = item.slug.split("#")[1];
      const targetSection = document.getElementById(sectionID);

      if (targetSection) {
        gsap.to(window, {
          scrollTo: { y: targetSection, autoKill: false },
          duration: 1,
          ease: "power3.out",
        });
      }
    }
  };

  return (
    <li className="nav-item relative opacity-0">
      <Link
        className={`relative block text-base pt-[18px] pl-[18px] pb-[18px] uppercase text-left lg:text-right mb-[15px]
                    text-(--color-black) overflow-hidden font-medium
                    before:content-[''] before:block before:absolute 
                    before:top-[90%] before:left-[0] before:h-[3px] before:w-[100%] before:bg-[var(--color-light-gray)]
                    after:content-[''] after:block after:absolute 
                    after:top-[90%] after:left-[0] after:h-[3px] after:w-[100%] after:bg-[var(--color-black)] 
                    after:transition-transform after:duration-200 after:ease-in-out
                   ${
                     isActive
                       ? "after:transform-[translateX(0%)]"
                       : "after:transform-[translateX(-100%)]"
                   }`}
        href={`/${item.slug}`}
        onClick={handleNavLinkClick}
      >
        {item.title}
      </Link>
    </li>
  );
}
