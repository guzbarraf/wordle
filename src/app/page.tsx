'use client'
import GridLetters from "@/components/GridLetters";
import {useGame} from "@/utils/useGame";
import Keyboard from "@/components/Keyboard";
import {Header} from "@/components/Header/Header";
import HowPlay from "@/components/HowPlay";

export default function Home() {
  const {
    showHowPlay,
    setShowHowPlay,
    word,
    originalWord,
    guesses,
    validateRow,
    setKeyPressed,
    gameOver,
  } = useGame(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 min-w-full max-w-5xl bg-slate-50 dark:bg-slate-900">
      <Header/>

      <div className={'text-black dark:invert'}>{word}</div>

      <GridLetters guesses={guesses} validateRow={validateRow}/>

      <Keyboard setKeyPressed={setKeyPressed}/>

      {showHowPlay ? <HowPlay setShowHowPlay={setShowHowPlay}/> : null}

      {gameOver === 'win' ? (
        <div className={'text-black dark:invert'}>WIN!!!</div>
      ) : null}

    </main>
  )
}
