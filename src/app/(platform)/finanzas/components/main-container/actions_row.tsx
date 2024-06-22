'use client';
import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import { GiPodiumWinner, GiPublicSpeaker } from "react-icons/gi";
import { usePayments } from '../../paymentsContext';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Payments } from '@/interfaces/Payments';

export default function ActionsRow() {
  const {contestPayments, eventPayments, variousPayments } = usePayments();

  const handleClick = (id) => {
    // Find the element by ID
    const element = document.getElementById(id);
    // If the element exists, simulate a click
    if (element) {
      element.click();
    } else {
      console.log(`Element with ID x not found`);
    }
  };
  
  return (
    <>
      <div className="flex text-center overflow-x-auto"> 
        <div className="grow p-2"> 
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_contest_button')}>
              <GiPodiumWinner className="text-xl text-white"/>
              <p className="text-xs font-bold mt-2 text-white">Concursos</p>
            </div>
        </div>
        <div className=" grow p-2"> 
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_event_button')}>
              <GiPublicSpeaker className="text-xl text-white"/>
              <p className="text-xs font-bold mt-2 text-white">Charlas</p>
            </div>
        </div>
        <div className=" grow p-2">
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_various_button')}>
              <FaQuestion className="text-xl text-white"/>
              <p className="text-xs font-bold mt-2 text-white">Otros</p>
            </div>
        </div>
      </div>
      <ContestModalInfo payments={contestPayments}/>
      <EventModalInfo/>
      <VariousModalInfo/>
    </>
  );
}

function ContestModalInfo({ payments }: { payments: Payments[] }){
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  console.log(payments);
  return (
    <div>
      <Button className='hidden' onPress={onOpen} id={'modal_contest_button'}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Transacciones en Concursos</ModalHeader>
              <ModalBody>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Aceptar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function EventModalInfo(){
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
      <Button className='hidden' onPress={onOpen} id={'modal_event_button'}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function VariousModalInfo(){
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
      <Button className='hidden' onPress={onOpen} id={'modal_various_button'}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
``