import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Link from "next/link";
import NavItemModel from "@/app/models/navItemModel";

interface NavigationItemProps {
  item: NavItemModel;
  isActive: boolean;
}

export default function NavigationItem({
  item,
  isActive,
}: NavigationItemProps) {
  useGSAP(() => {
    gsap.fromTo(
      ".nav-item",
      { opacity: 0, top: "20px" },
      { opacity: 1, top: 0, duration: 0.5, stagger: 0.2 }
    );
  });

  return (
    <li className="nav-item relative">
      <Link
        className={`relative block text-base pt-[18px] pl-[18px] pb-[18px] uppercase text-right mb-[15px]
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
      >
        {item.title}
      </Link>
    </li>
  );
}
