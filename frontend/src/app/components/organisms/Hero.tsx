"use client";

import { useRef } from "react";
import BannerModel from "@/app/models/bannerModel";
import ImageAtom from "../atoms/Image";
import { LuChevronDown } from "react-icons/lu";

import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/all";
import gsap from "gsap";

interface HeroProps {
  data: BannerModel;
}

export default function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const {
    id,
    title,
    firstStripedImage,
    secondStripedImage,
    thirdStripedImage,
  } = data;

  gsap.registerPlugin(ScrollToPlugin);

  useGSAP(() => {
    const isMobile = window?.innerWidth < 768;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".arrow-down, .brush-indicator", {
          y: 16,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    tl.fromTo(
      ".nav-item",
      { opacity: 0, top: "20px" },
      { opacity: 1, top: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" }
    );

    if (!isMobile) {
      tl.fromTo(
        ".banner-clip",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.25, ease: "power3.out" },
        "-=0.2"
      );

      gsap.to(".moving-image", {
        x: "-10%",
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    tl.fromTo(
      ".hero-title, .hero-link",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.3"
    );

    tl.to(
      ".hero-underline",
      { width: "100%", duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".arrow-down",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "circ.out",
      },
      "-=0.3"
    );
  });

  const handleNavToNextSection = () => {
    if (heroRef.current) {
      const nextSection = heroRef.current.nextElementSibling;
      if (nextSection) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: nextSection, autoKill: false },
          ease: "power2.inOut",
        });
      }
    }
  };

  return (
    <section
      id={id}
      ref={heroRef}
      className="relative p-8 sm:px-15 h-[calc(100vh-40px)] lg:h-screen overflow-hidden flex items-end justify-end"
    >
      <div className="relative z-2 flex flex-col items-start">
        {title && (
          <h1
            className="hero-title text-white text-[36px] lg:text-[72px] opacity-0 bg-[rgba(0,0,0,0.2)] p-3 rounded-2xl
            lg:bg-transparent lg:p-0 lg:rounded-none text-right lg:text-left"
          >
            {title}
          </h1>
        )}
        <div className="hero-underline bg-white h-1 w-0 mt-1 rounded" />
        <button
          type="button"
          onClick={handleNavToNextSection}
          className="scroll-indicator mt-8 cursor-pointer mx-auto lg:mx-0"
        >
          <LuChevronDown className="arrow-down opacity-0 w-[40px] h-[40px] text-white" />
        </button>
      </div>
      {firstStripedImage && (
        <div className="banner-clip absolute top-0 left-[-24%] transform-[translateX(-24%)] w-full h-full overflow-hidden lg:opacity-0">
          <ImageAtom
            priority={true}
            image={firstStripedImage}
            className="moving-image object-cover h-full w-full absolute top-0 left-0 w-[110%] h-[110%]"
          />
        </div>
      )}
      {secondStripedImage && (
        <div className="banner-clip absolute top-0 left-[-11%] transform-[translateX(-10%)] w-full h-full overflow-hidden lg:opacity-0">
          <ImageAtom
            priority={true}
            image={secondStripedImage}
            className="moving-image object-cover h-full w-full absolute top-0 left-0 w-[110%] h-[110%]"
          />
        </div>
      )}
      {thirdStripedImage && (
        <div className="banner-clip absolute top-0 left-[-10%] left-[30%] transform-[translateX(-24%)] w-full h-full overflow-hidden lg:opacity-0">
          <ImageAtom
            priority={true}
            image={thirdStripedImage}
            className="moving-image object-cover h-full w-full absolute top-0 left-0 w-[110%] h-[110%]"
          />
        </div>
      )}
    </section>
  );
}
