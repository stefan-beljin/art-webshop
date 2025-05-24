"use client";

import gsap from "gsap";
import { strings } from "@/app/constants";

import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { ScrollToPlugin } from "gsap/all";

export default function BackToTop() {
  const handleBackToStart = () => {
    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, { duration: 1, scrollTo: 0 });
  };

  return (
    <button
      type="button"
      className="flex self-start items-center gap-x-2 cursor-pointer"
      onClick={handleBackToStart}
    >
      <span className="text-[16px] lg:text-[20px]">{strings.BACK_TO_TOP}</span>
      <FaRegArrowAltCircleUp fill="#fff" className="h-[30px] w-[30px]" />
    </button>
  );
}
