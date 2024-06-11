'use client';
import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import { GiPodiumWinner, GiCompass, GiDiamondHard, GiStabbedNote, GiPublicSpeaker } from "react-icons/gi";

export default function ActionsRow() {

  const handleClick = (message) => {
    alert(`Clicked on ${message}`);
  };

  return (
    <>
      <div className="flex flex-wrap text-center"> {/* Asegura que los elementos estén centrados */}
        {/* Cada icono y texto en su contenedor, usando Tailwind para estilos */}
        <div className="w-full md:w-1/4 p-2">
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-centerhover:bg-gray-100 cursor-pointer"
          onClick={() => handleClick('Concursos')}>
            <GiPodiumWinner className="text-xl"/>
            <p className="text-xs font-bold mt-2">Concursos</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
        <div className="border-2 rounded-md p-2 flex flex-col items-center justify-centerhover:bg-gray-100 cursor-pointer"
          onClick={() => handleClick('Concursos')}>
            <GiPublicSpeaker className="text-xl"/>
            <p className="text-xs font-bold mt-2">Charlas</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-2">
        <div className="border-2 rounded-md p-2 flex flex-col items-center bg-primary hover:bg-secondary justify-centerhover:bg-red cursor-pointer"
          onClick={() => handleClick('Concursos')}>
            <FaQuestion className="text-xl  text-white"/>
            <p className="text-xs font-bold mt-2 text-white">Otros</p>
          </div>
        </div>
      </div>
    </>
  );
}
