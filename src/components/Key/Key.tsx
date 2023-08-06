"use client";
import Image from "next/image";
import imgBack from '@/../public/back.svg';

export interface KeyProps {
  letter: string
  onClick?: () => {} | any;
}

function ImgBack() {
  return(
    <Image src={imgBack} alt={''}/>
  )
}

export const Key = ({
  letter,
  onClick
}: KeyProps) => {

  return (
    <button
      className={`min-w-[50px] w-auto h-[50px] m-2 p-2 ${letter !== '<' ? 'pr-4 pl-4' : 'pr-8 pl-8'} flex items-center justify-center rounded-md bg-gray-500 text-8ray-300 hover:scale-110 active:scale-100 duration-200`}
      onClick={onClick}
    >
      {letter !== '<' ? letter : <ImgBack/>}
    </button>
  );
};
