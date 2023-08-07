'use client'
import GridLetters from "@/components/GridLetters";
import {useGame} from "@/utils/useGame";
import Keyboard from "@/components/Keyboard";
import {Header} from "@/components/Header/Header";
import HowPlay from "@/components/HowPlay";
import Stats from "@/components/Stats";

export default function Home() {
  const {
    showHowPlay,
    setShowStats,
    setShowHowPlay,
    word,
    originalWord,
    guesses,
    validateRow,
    fnKeyPressed,
    fnDeletedLetter,
    gameOver,
    showStats,
    fnCloseStats,
    stats,
    timer,
  } = useGame();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 min-w-full max-w-5xl bg-slate-50 dark:bg-slate-900">
      <Header setShowHowPlay={setShowHowPlay} setShowStats={setShowStats}/>

      <GridLetters guesses={guesses} validateRow={validateRow}/>

      <Keyboard fnKeyPressed={fnKeyPressed} fnDeletedLetter={fnDeletedLetter}/>

      {showHowPlay ? <HowPlay setShowHowPlay={setShowHowPlay}/> : null}

      {showStats ? (
        <Stats fnCloseStats={fnCloseStats} stats={stats} word={originalWord} gameOver={gameOver} timer={timer}/>
      ) : null}

    </main>
  )
}
