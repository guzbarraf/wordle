'use client'
import React from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Image from "next/image";
import ImgHelp from '@/../public/help.svg';
import ImgStats from '@/../public/stats.svg';
export const Header = () => {

  return (
    <header className={'max-w-[638px] w-full h-[80px] bg-gray-300 dark:invert flex items-center justify-between rounded-lg'}>
      <div className={'w-32 pl-6 hover:scale-110 active:scale-100 duration-200'}>
        <button>
          <Image
            src={ImgHelp}
            alt={''}
            priority={true}
            onClick={() => {
              console.log('Help');
            }}
          />
        </button>
      </div>
      <div>
        <div className={'text-black text-4xl'}>WORDLE</div>
      </div>
      <div className={'w-32 pr-6 flex items-center justify-between '}>
        <div className={'hover:scale-110 active:scale-100 duration-200 '}>
          <button>
            <Image
              src={ImgStats}
              alt={''}
              priority={true}
              onClick={() => {
                console.log('Stats');
              }}
            />
          </button>
        </div>
        <div className={'pl-2 dark:invert'}>
          <ThemeSwitcher/>
        </div>
      </div>
    </header>
  )
}
