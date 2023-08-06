const fs = require('fs/promises')

export async function GET() {
  const maxLetters = 5;
  const getData = await fs.readFile('./src/data/words.txt')
    .then((data: any) => {
      return data.toString();
    })
    .catch((error: any) => {
      return error;
    });

  const words = getData.split('\n');
  const filterWords = words.filter((word: string) => word.length === maxLetters);
  // console.log(words);
  // console.log(filterWords);

  const randomIndex = Math.floor(Math.random() * filterWords.length);
  const selectedWord = filterWords[randomIndex];
  console.log(selectedWord);

  return new Response(JSON.stringify({
    word: selectedWord
  }))
}