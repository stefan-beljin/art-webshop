"use client";

import { useState, useEffect } from "react";

export const useHash = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onHashChanged = () => setHash(window.location.hash);
    const { pushState, replaceState } = window.history;

    window.history.pushState = function (...args) {
      pushState.apply(window.history, args);
      setTimeout(() => setHash(window.location.hash));
    };

    window.history.replaceState = function (...args) {
      replaceState.apply(window.history, args);
      setTimeout(() => setHash(window.location.hash));
    };

    window.addEventListener("hashchange", onHashChanged);

    return () => {
      window.removeEventListener("hashchange", onHashChanged);
    };
  }, []);
  return hash;
};

export default useHash;
