'use client';
import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import { GiPodiumWinner, GiPublicSpeaker } from "react-icons/gi";

export default function ActionsRow() {

  const handleClick = (message) => {
    alert(`Clicked on ${message}`);
  };

  return (
    <>
      <div className="flex text-center overflow-x-auto"> 
        <div className="grow p-2"> 
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('Concursos')}>
              <GiPodiumWinner className="text-xl text-white"/>
              <p className="text-xs font-bold mt-2 text-white">Concursos</p>
            </div>
        </div>
        <div className=" grow p-2"> 
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('Charlas')}>
              <GiPublicSpeaker className="text-xl text-white"/>
              <p className="text-xs font-bold mt-2 text-white">Charlas</p>
            </div>
        </div>
        <div className=" grow p-2">
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('Otros')}>
              <FaQuestion className="text-xl text-white"/>
              <p className="text-xs font-bold mt-2 text-white">Otros</p>
            </div>
        </div>
      </div>
    </>
  );
}
