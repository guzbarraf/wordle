"use client";
import Letter from '@/components/Letter';

export interface GridLettersProps {
  guesses: object,
  validateRow: any,
}

export const GridLetters = ({guesses, validateRow}: GridLettersProps) => {

  return (
    <div className="container m-auto grid grid-rows-5 gap-0 h-min max-w-[450px] ">
      {guesses.map((guess: any, indexP: number) => {
        // console.log('guess =>', guess);
        const y = indexP + 1;

        return (
          <div key={indexP} className={'grid grid-cols-5 gap-0'}>
            {guess.map((item: any, index: number) => {
              // console.log('item =>', item);
              const x = index + 1;

              return (
                <Letter
                  key={index}
                  id={`${y}-${x}`}
                  letter={item.value}
                  bgColor={item.bgColor}
                  validate={validateRow[indexP]}
                  index={1}
                  x={x}
                  y={y}
                />
              )
            })}
          </div>
        )
      })}

    </div>
  );
};
