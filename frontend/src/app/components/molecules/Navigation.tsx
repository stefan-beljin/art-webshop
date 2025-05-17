"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useHash from "@/app/hooks/useHash";
import NavItemModel from "@/app/models/navItemModel";

import NavigationItem from "../atoms/NavigationItem";

interface NavigationProps {
  navItems: NavItemModel[];
  navigationType: string;
}

export default function Navigation({
  navItems,
  navigationType,
}: NavigationProps) {
  const hash = useHash();
  const router = useRouter();
  const pathName = usePathname();
  const isHomepage = pathName === "/";

  useEffect(() => {
    if (isHomepage) {
      const defaultSlug = navItems[0].slug;

      if (hash === "") {
        router.push(defaultSlug);
      }
    }
  }, [hash, isHomepage, router, navItems]);

  return (
    <nav aria-label={navigationType}>
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
    </nav>
  );
}
