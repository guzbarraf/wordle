"use client";

import Letter from "@/components/Letter";

type HowPlayProps = {
  setShowHowPlay: any;
}

export const HowPlay = ({setShowHowPlay}: HowPlayProps) => {

  return (
    <div className={'absolute w-full h-full bg-gray-300/95 dark:invert flex items-center justify-center'}>
      <div className={'w-[546px] p-11 rounded-lg border border-gray-900 bg-gray-300'}>

        <div className={'text-black'}>Cómo Jugar</div>

        <div className={'text-black'}>
          <p className={'pb-4'}>Adivina la palabra oculta en cinco intentos.</p>
          <p className={'pb-4'}>Cada intento debe ser una palabra válida de 5 letras.</p>
          <p className={'pb-4'}>Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</p>
        </div>

        <div className={'text-black mt-2 mb-2'}>Ejemplos</div>

        <div className={'dark:invert flex items-center justify-center'}>
          <Letter id={'1'} letter={'G'} bgColor={'bg-green-500'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'A'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'T'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'O'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'S'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
        </div>

        <div className={'text-black mt-2 mb-2'}>La letra G está en la palabra y en la posición correcta.</div>

        <div className={'dark:invert flex items-center justify-center'}>
          <Letter id={'1'} letter={'V'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'O'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'C'} bgColor={'bg-yellow-400'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'A'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'L'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
        </div>

        <div className={'text-black mt-2 mb-2'}>La letra C está en la palabra pero en la posición incorrecta.</div>

        <div className={'dark:invert flex items-center justify-center'}>
          <Letter id={'1'} letter={'C'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'A'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'N'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'T'} bgColor={'bg-gray-300'} index={1} validate={true} x={1} y={1}/>
          <Letter id={'1'} letter={'O'} bgColor={'bg-gray-600'} index={1} validate={true} x={1} y={1}/>
        </div>

        <div className={'text-black mt-2 mb-2'}>
          <p className={'pb-4'}>La letra O no está en la palabra.</p>
          <p className={'pb-4'}>Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>
          <p className={'pb-4'}>¡Una palabra nueva cada 5 minutos!</p>
        </div>

        <div className={'dark:invert flex items-center justify-center'}>
          <button
            className={'bg-green-400 hover:bg-green-700 text-white text-2xl font-bold py-2 px-4 rounded'}
            onClick={() => {
              setShowHowPlay(false);
            }}
          >
            !JUGAR¡
          </button>
        </div>
      </div>
    </div>
  );
};
