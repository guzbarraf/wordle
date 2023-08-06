"use client";
import Key from "@/components/Key";

const letters = [
  [
    {letter: 'Q', status: ''},
    {letter: 'W', status: ''},
    {letter: 'E', status: ''},
    {letter: 'R', status: ''},
    {letter: 'T', status: ''},
    {letter: 'Y', status: ''},
    {letter: 'U', status: ''},
    {letter: 'I', status: ''},
    {letter: 'O', status: ''},
    {letter: 'P', status: ''},
  ], [
    {letter: 'A', status: ''},
    {letter: 'S', status: ''},
    {letter: 'D', status: ''},
    {letter: 'F', status: ''},
    {letter: 'G', status: ''},
    {letter: 'H', status: ''},
    {letter: 'J', status: ''},
    {letter: 'K', status: ''},
    {letter: 'L', status: ''},
    {letter: 'Ñ', status: ''},
  ], [
    {letter: 'ENTER', status: ''},
    {letter: 'Z', status: ''},
    {letter: 'X', status: ''},
    {letter: 'C', status: ''},
    {letter: 'V', status: ''},
    {letter: 'B', status: ''},
    {letter: 'N', status: ''},
    {letter: 'M', status: ''},
    {letter: '<', status: ''},
  ],
];

export interface KeyboardProps {
  setKeyPressed: any;
}

export const Keyboard = ({
  setKeyPressed,
}: KeyboardProps) => {

  return (
    // <div className={`container grid grid-rows-3 grid-cols-10 gap-0 max-w-[650px] w-auto h-auto m-2 p-2 rounded-md bg-gray-300 `}>
    <div className={`flex items-center justify-center flex-col max-w-[700px] w-auto h-auto m-4 p-2 rounded-md bg-gray-300 `}>
      {letters.map((letter: any, indexP: number) => {
        // console.log('letter =>', letter);

        return (
          <div key={indexP} className={'flex items-center justify-center mr-2 ml-2'}>
            {letter.map((item: any, index: number) => {
              return (
                <Key
                  key={index}
                  letter={item.letter}
                  onClick={() => {
                    // console.log('Click =>', item.letter);
                    setKeyPressed(item.letter);
                  }}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  );
};
