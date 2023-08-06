"use client";

export interface LetterProps {
  id: string;
  letter: string;
  bgColor: string;
  index: number;
  validate: boolean;
  x: number;
  y: number;
}

export const Letter = ({
  id,
  letter,
  bgColor,
  validate,
}: LetterProps) => {

  return (
    <div
      id={id}
      className={`
        w-[72px] h-[72px] flex items-center justify-center m-2 p-2 rounded-md
        ${validate ? bgColor : 'bg-gray-400'}
         font-bold
      `}>
      {letter}
    </div>
  );
};
