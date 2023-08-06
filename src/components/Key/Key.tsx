"use client";

export interface KeyProps {
  letter: string
  onClick?: () => {} | any;
}

export const Key = ({
  letter,
  onClick
}: KeyProps) => {

  return (
    <button
      className={`w-[50px] h-[50px] flex items-center justify-center m-2 p-2 rounded-md bg-gray-500 text-8ray-300 hover:scale-110 active:scale-100 duration-200 `}
      onClick={onClick}
    >
      {letter}
    </button>
  );
};
