'use client'
import React from "react";

type StatsDetailsProps = {
  plays: number;
  wins: number;
}

type StatsProps = {
  fnCloseStats: () => void;
  stats: StatsDetailsProps;
  word: string;
  timer: string;
  gameOver: string;
}

export const Stats = (x: StatsProps) => {

  return (
    <div className={'absolute w-full h-full bg-gray-300/95 dark:invert flex items-center justify-center'}>
      <div className={'w-[546px] p-11 rounded-lg border border-gray-900 bg-gray-300 text-black flex items-center justify-center flex-col'}>

        <div className={'text-4xl font-bold mb-8'}>Estadísticas</div>

        <div className={'w-full mb-8 grid grid-rows-1 grid-cols-2 gap-4'}>
          <div className={'flex items-center justify-center flex-col'}>
            <div className={'text-4xl font-bold'}>{x.stats.plays}</div>
            <div>Jugadas</div>
          </div>
          <div className={'flex items-center justify-center flex-col'}>
            <div className={'text-4xl font-bold'}>{x.stats.wins}</div>
            <div>Victorias</div>
          </div>
        </div>

        {x.gameOver ? (
          <div className={'mb-8'}>La palabra era: <span className={'text-xl font-bold'}>{x.word}</span></div>
        ) : null}

        <div className={'mb-8 flex items-center justify-center flex-col'}>
          <div>SIGUIENTE PALABRA</div>
          <div className={'text-2xl font-bold'}>{x.timer}</div>
        </div>

        <div className={'dark:invert flex items-center justify-center'}>
          <button
            className={'bg-green-400 hover:bg-green-700 text-white text-2xl font-bold py-2 px-4 rounded'}
            onClick={() => {
              if (x.fnCloseStats) {
                x.fnCloseStats();
              }
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
