'use client'
import {useEffect, useState} from "react";

const typeLetter = {
  empty: 'empty',
  ok: 'ok',
  exist: 'exist',
  not_exist: 'not_exist',
};

export const useGame = () => {
  const maxLetters = 5;
  const maxWorks = 5;
  let responseLetter = {
    status: typeLetter.not_exist,
    bgColor: 'bg-gray-400',
    validate: false,
  };
  const [showHowPlay, setShowHowPlay] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({
    plays: 0,
    wins: 0,
    startTime: 0,
  });
  const [gameOver, setGameOver] = useState('');
  const [timer, setTimer] = useState('00:00');
  const [numGetWord, setNumGetWord] = useState(0);
  const [word, setWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [wordIndexes, setWordIndexes] = useState(["", "", "", "", ""]);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [validateRow, setValidateRow] = useState([
    false, false, false, false, false
  ]);
  const guessesTemplate = [
    [
      {x: 1, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 2, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 3, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 4, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 5, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
    ], [
      {x: 1, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 2, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 3, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 4, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 5, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
    ], [
      {x: 1, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 2, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 3, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 4, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 5, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
    ], [
      {x: 1, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 2, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 3, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 4, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 5, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
    ], [
      {x: 1, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 2, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 3, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 4, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
      {x: 5, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-400'},
    ]
  ];
  const [guesses, setGuesses] = useState(guessesTemplate);
  const timeCountDown = 5 * 60;
  const { minutes, seconds, resetCounter } = useRecursiveCounter(timeCountDown);

  useEffect(() => {
    getWord().then((value) => {
      setOriginalWord(value);
      setWord(fnCleanWord(value));
      setGameOver('');
      setLastX(0);
      setLastY(0);
      setWordIndexes(["", "", "", "", ""]);
      setValidateRow([false, false, false, false, false]);
    }, (error) => {});
  }, [numGetWord]);

  useEffect(() => {
    if (word) {
      setWordIndexes(word.split(''));
    }
  }, [word]);

  useEffect(() => {
    if (seconds <= 0) {
      newGame();
      return;
    } else {
      const time = `${minutes < 1 ? '00' : minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      setTimer(time);
    }
  }, [minutes, seconds]);

  function newGame() {
    setGuesses(guessesTemplate);
    setNumGetWord(numGetWord + 1);
  }

  function fnCloseStats() {
    setShowStats(false);

    if (gameOver === 'win' || gameOver === 'loose') {
      newGame();
    }
  }

  function fnDeletedLetter() {
    if (lastX === 0 && lastY === 0) {} else {
      const arGuesses = guesses;
      const arValidate = validateRow;

      const _lastX = lastX === 0 ? maxLetters - 1 : lastX - 1;
      const _lastY = lastX === 0 ? lastY - 1 : lastY;

      setLastY(_lastY);
      setLastX(_lastX);

      responseLetter = {
        status: typeLetter.not_exist,
        bgColor: 'bg-gray-400',
        validate: false,
      };

      arGuesses[_lastY][_lastX].value = '';
      arGuesses[_lastY][_lastX].status = responseLetter?.status;
      arGuesses[_lastY][_lastX].bgColor = responseLetter?.bgColor;
      arValidate[_lastY] = responseLetter?.validate;

      setValidateRow(arValidate);
      setGuesses(arGuesses);
    }
  }

  function fnKeyPressed(keyPressed: string) {
    if (lastY < maxWorks) {
      const arGuesses = guesses;
      const arValidate = validateRow;

      responseLetter = fnCheckLetterInWord(keyPressed, lastX);

      arGuesses[lastY][lastX].value = keyPressed;
      arGuesses[lastY][lastX].status = responseLetter?.status;
      arGuesses[lastY][lastX].bgColor = responseLetter?.bgColor;
      arValidate[lastY] = responseLetter?.validate;

      setValidateRow(arValidate);
      setGuesses(arGuesses);

      if (lastX === maxLetters - 1 || lastY === maxWorks - 1) {
        fnValidateGame();
      }

      setLastY(lastX === maxLetters - 1 ? lastY + 1 : lastY);
      setLastX(lastX < maxLetters - 1 ? lastX + 1 : 0);

    } else {
      setGameOver('loose');
      fnValidateGame();
    }
  }

  function fnValidateGame() {
    let foundWord = false;

    guesses.map((guess, index) => {
      const response = guess.filter((item: object, _index: number) => {
        if (item?.status === typeLetter.ok) {
          return item;
        }
      });

      if (response.length === 5) {
        foundWord = true;
      }
    });

    if (foundWord) {
      setStats({
        ...stats,
        plays: stats.plays + 1,
        wins: stats.wins + 1,
      });
      setGameOver('win');
      setShowStats(true);
    } else if (lastY === maxWorks - 1 && lastX === maxLetters - 1){
      setGameOver('loose');
      setStats({
        ...stats,
        plays: stats.plays + 1,
      });
      setShowStats(true);
    }
  }

  function fnCheckLetterInWord(letter: string, index: number) {
    const _letter = letter.toLowerCase();
    const indexWord: any = [];
    let _validate = false;
    let resp = {
      status: typeLetter.not_exist,
      bgColor: 'bg-gray-600',
      validate: _validate,
    };

    const filterLetters = wordIndexes.filter((wordI: string, _index: number) => {
      if (wordI === _letter) {
        indexWord.push(_index);
        return wordI;
      }
    });

    if (index === maxLetters - 1) {
      _validate = true;
    }

    if (filterLetters.length === 0) {
      resp = {
        status: typeLetter.not_exist,
        bgColor: 'bg-gray-600',
        validate: _validate,
      };
    } else if (filterLetters.length === 1) {
      if (indexWord[0] === index) {
        resp = {
          status: typeLetter.ok,
          bgColor: 'bg-green-500',
          validate: _validate,
        };
      } else {
        resp = {
          status: typeLetter.exist,
          bgColor: 'bg-yellow-400',
          validate: _validate,
        };
      }
    } else if (filterLetters.length > 1) {
      const valueIndexWord = indexWord.filter((iw: number) => iw === index);

      if (valueIndexWord[0] === index) {
        resp = {
          status: typeLetter.ok,
          bgColor: 'bg-green-500',
          validate: _validate,
        };
      } else {
        resp = {
          status: typeLetter.exist,
          bgColor: 'bg-yellow-400',
          validate: _validate,
        };
      }
    } else {
      resp = {
        status: typeLetter.exist,
        bgColor: 'bg-yellow-400',
        validate: _validate,
      };
    }

    return resp;
  }

  function fnCleanWord(word: string) {
    const accents = {'á':'a','ä':'a','é':'e','ë':'e','í':'i','ï':'i','ó':'o','ö':'o','ú':'u','ü':'u'};
    return word.split('').map( (letter: string) => accents[letter] || letter).join('').toString();
  }

  async function getWord() {
    const res = await fetch("/api/data", {method: "GET"})
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {});

    return res?.word;
  }

  return {
    showHowPlay,
    setShowHowPlay,
    word,
    originalWord,
    guesses,
    validateRow,
    fnKeyPressed,
    fnDeletedLetter,
    gameOver,
    showStats,
    setShowStats,
    fnCloseStats,
    stats,
    timer,
  }
};

function useRecursiveCounter(totalTimeInSeconds: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(totalTimeInSeconds);
  const [activeCounter, setActiveCounter] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (activeCounter && secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else if (activeCounter && secondsRemaining === 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining(totalTimeInSeconds);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [secondsRemaining, activeCounter, totalTimeInSeconds]);

  const resetCounter = () => {
    setActiveCounter(true);
    setSecondsRemaining(totalTimeInSeconds);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return { minutes, seconds, resetCounter };
}
