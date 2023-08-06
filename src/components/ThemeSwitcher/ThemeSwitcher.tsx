"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ImgDay from "../../../public/switch-day.svg";
import ImgNight from "../../../public/switch-night.svg";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [imgSwitch, setImgSwitch] = useState(ImgDay);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    theme === "light" ? setImgSwitch(ImgDay) : setImgSwitch(ImgNight);
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-fit top-2 p-2 hover:scale-110 active:scale-100 duration-200`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Image
        src={imgSwitch}
        alt={''}
        priority={true}
      />
    </button>
  );
};