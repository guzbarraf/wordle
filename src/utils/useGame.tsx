'use client'
import {useEffect, useState} from "react";

type useGameProps = {
  cantGetWord: number,
}

const typeLetter = {
  empty: 'empty',
  ok: 'ok',
  exist: 'exist',
  not_exist: 'not_exist',
};

export const useGame = ({cantGetWord}: useGameProps) => {
  const maxLetters = 5;
  const maxWorks = 5;
  let responseLetter = {
    status: typeLetter.not_exist,
    bgColor: 'bg-gray-300',
    validate: false,
  };
  const [gameOver, setGameOver] = useState('');
  const [word, setWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [wordIndexes, setWordIndexes] = useState([]);
  const [keyPressed, setKeyPressed] = useState('');
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [validateRow, setValidateRow] = useState([
    false, false, false, false, false
  ]);
  const [guesses, setGuesses] = useState([
    [
      {x: 1, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 2, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 3, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 4, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 5, y: 1, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
    ], [
      {x: 1, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 2, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 3, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 4, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 5, y: 2, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
    ], [
      {x: 1, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 2, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 3, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 4, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 5, y: 3, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
    ], [
      {x: 1, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 2, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 3, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 4, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 5, y: 4, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
    ], [
      {x: 1, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 2, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 3, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 4, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
      {x: 5, y: 5, value: '', status: typeLetter.empty, bgColor: 'bg-gray-300'},
    ]
  ]);

  useEffect(() => {
    getWord().then((value) => {
      // console.log('getWord() => value =>', value);
      setOriginalWord(value);
      setWord(fnCleanWord(value));
    }, (error) => {
      // console.error('error =>', error);
    });
  }, [cantGetWord]);

  useEffect(() => {
    if (word) {
      // console.log('word =>', word);
      setWordIndexes(word.split(''));
    }
  }, [word]);

  /*useEffect(() => {
    if (wordIndexes) {
      console.log('wordIndexes =>', wordIndexes);
    }
  }, [wordIndexes]);*/

  useEffect(() => {
    console.log('guesses =>', guesses);
  }, [guesses]);

  useEffect(() => {
    if (keyPressed) {
      // console.log('keyPressed =>', keyPressed);
      fnKeyPressed();
    }
  }, [keyPressed]);

  useEffect(() => {
    console.log('validateRow =>', validateRow);
    fnValidateGame();
  }, [fnValidateGame, validateRow]);

  function fnKeyPressed() {
    if (lastY < maxWorks) {
      const arGuesses = guesses;
      const arValidate = validateRow;

      responseLetter = fnCheckLetterInWord(keyPressed, lastX);
      // console.log('responseLetter =>', responseLetter);

      arGuesses[lastY][lastX].value = keyPressed;
      arGuesses[lastY][lastX].status = responseLetter?.status;
      arGuesses[lastY][lastX].bgColor = responseLetter?.bgColor;
      arValidate[lastY] = responseLetter?.validate;
      // console.log('fnKeyPressed() =>', arGuesses);
      console.log('fnKeyPressed() => arValidate =>', arValidate);

      setValidateRow(arValidate);
      setGuesses(arGuesses);

      setLastY(lastX === maxLetters - 1 ? lastY + 1 : lastY);
      setLastX(lastX < maxLetters - 1 ? lastX + 1 : 0);

    } else {
      console.log('SE TERMINÓ EL JUEGO');
    }
  }

  function fnValidateGame() {
    console.log('fnValidateGame() => guesses =>', guesses);
    let counterLetter = 0;

    guesses.map((guess, index) => {
      guess.filter((item: object, _index: number) => {
        if (item?.status === typeLetter.ok) {
          counterLetter++;
          return item;
        }
      });
    });

    console.log('counterLetter =>', counterLetter);
    if (counterLetter === maxLetters) {
      setGameOver('win');
    } else if (lastY === maxWorks && lastX === maxLetters){
      setGameOver('loose');
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

    console.log('filterLetters =>', filterLetters);
    console.log('indexWord =>', indexWord);
    console.log('index =>', index);
    // console.log('index === maxLetters - 1 =>', index === maxLetters - 1);

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

      console.log('letter =>', letter);
      console.log('indexWord =>', indexWord);
      console.log('index =>', index);
      console.log('valueIndexWord =>', valueIndexWord);

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

    console.log('resp =>', resp);

    return resp;
  }

  function fnCleanWord(word: string) {
    const accents = {'á':'a','ä':'a','é':'e','ë':'e','í':'i','ï':'i','ó':'o','ö':'o','ú':'u','ü':'u'};
    const cleanWord = word.split('').map( (letter: string) => accents[letter] || letter).join('').toString();

    console.log('cleanWord =>', cleanWord);

    return cleanWord;
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
      .catch(error => {
        console.error('Error:', error);
      });

    return res?.word;
  }

  return {
    word,
    originalWord,
    guesses,
    validateRow,
    setKeyPressed,
    gameOver,
  }
};
