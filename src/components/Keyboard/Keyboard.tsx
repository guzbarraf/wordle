"use client";
import Key from "@/components/Key";

const letters = [
  [
    {letter: 'Q', code: 'Q'},
    {letter: 'W', code: 'W'},
    {letter: 'E', code: 'E'},
    {letter: 'R', code: 'R'},
    {letter: 'T', code: 'T'},
    {letter: 'Y', code: 'Y'},
    {letter: 'U', code: 'U'},
    {letter: 'I', code: 'I'},
    {letter: 'O', code: 'O'},
    {letter: 'P', code: 'P'},
  ], [
    {letter: 'A', code: 'A'},
    {letter: 'S', code: 'S'},
    {letter: 'D', code: 'D'},
    {letter: 'F', code: 'D'},
    {letter: 'G', code: 'G'},
    {letter: 'H', code: 'H'},
    {letter: 'J', code: 'J'},
    {letter: 'K', code: 'K'},
    {letter: 'L', code: 'L'},
    {letter: 'Ñ', code: 'Ñ'},
  ], [
    {letter: 'ENTER', code: 'ENTER'},
    {letter: 'Z', code: 'Z'},
    {letter: 'X', code: 'X'},
    {letter: 'C', code: 'C'},
    {letter: 'V', code: 'V'},
    {letter: 'B', code: 'B'},
    {letter: 'N', code: 'N'},
    {letter: 'M', code: 'M'},
    {letter: '<', code: '<'},
  ],
];

export interface KeyboardProps {
  fnKeyPressed: (key: string) => void;
  fnDeletedLetter: () => void;
}

export const Keyboard = (x: KeyboardProps) => {

  return (
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
                    if (item.letter !== 'ENTER') {
                      if (item.letter === '<') {
                        x.fnDeletedLetter();
                      } else {
                        x.fnKeyPressed(item.letter);
                      }
                    }
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
