'use client';
import React, { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { GiPodiumWinner, GiPublicSpeaker } from "react-icons/gi";
import { usePayments } from '../../paymentsContext';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, DatePicker, Input, Textarea, DateValue } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Payments } from '@/interfaces/Payments';
import { Participation } from '@/interfaces/Participation';
import { Contest } from '@/interfaces/Contest';
import { Event } from '@/interfaces/Event';
import { Team } from '@/interfaces/Team';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { addPyment } from '@/services/payments.service';
import SelectUsers from '@/app/(platform)/tareas/components/selectUsers';
import { parseDate } from '@/utils/utils';
import { currentDate } from '@/constants/date_constants';

export default function ActionsRow() {
  const { contestPayments, eventPayments, variousPayments } = usePayments();

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
            <GiPodiumWinner className="text-xl text-white" />
            <p className="text-xs font-bold mt-2 text-white">Concursos</p>
          </div>
        </div>
        <div className=" grow p-2">
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_event_button')}>
            <GiPublicSpeaker className="text-xl text-white" />
            <p className="text-xs font-bold mt-2 text-white">Charlas</p>
          </div>
        </div>
        <div className=" grow p-2">
          <div className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_various_button')}>
            <FaQuestion className="text-xl text-white" />
            <p className="text-xs font-bold mt-2 text-white">Otros</p>
          </div>
        </div>
      </div>
      <ContestModalInfo payments={contestPayments} />
      <EventModalInfo />
      <VariousModalInfo />
    </>
  );
}

function ContestModalInfo({ payments }: { payments: Payments[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      monto: "",
      detalle: "",
      categoria: "",
      user: ""
    },
    onSubmit: (values) => {
      const payment: Payments = {
        monto: parseFloat(values.monto),
        tipo: "egreso",
        detalle: values.detalle,
        categoria: values.categoria,
        creado_por: values.user,
        fecha_hora_creacion: new Date().toISOString()
      };
      toast.promise(addPyment(payment, 'concursos'), {
        loading: "Guardando...",
        success: () => {
          console.log("Pago registrado correctamente!");
          formik.resetForm();
          return <b>Pago Registrado</b>;
        },
        error: (err) => {
          formik.setSubmitting(false);
          return `${err.message.toString()}`;
        },
      });
    },
  });

  return (
    <div>
      <Button className='hidden' onPress={onOpen} id={'modal_contest_button'}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Tabs aria-label="Options" className='w-full pt-12 justify-center'>
                <Tab key="transactions_list" title="Lista de Transacciones">
                  <ModalBody>
                    {
                      payments?.map((payment, index) => (
                        <Card key={index} className="mb-2">
                          <CardBody>
                            <div className="text-gray-800 text-sm space-y-2">
                              <div className="flex justify-between items-center p-2">
                                <p><strong>Monto:</strong> ${payment.monto.toFixed(2)}</p>
                                <div className={`rounded-full px-3 rounded-md text-white ${payment.tipo == 'ingreso' ? 'bg-secondary' : 'bg-error'}`}>
                                  <p>{payment.tipo.toUpperCase()}</p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center px-2">
                                <p><strong>Concurso:</strong> {String(((payment.id_participacion as Participation).id_concurso as Contest).nombre)}</p>
                              </div>
                              <div className="flex justify-between items-center px-2">
                                <p><strong>Equipo: </strong>{String(((payment.id_participacion as Participation).id_equipo as Team).nombre)}</p>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))
                    }
                    <ModalFooter className='flex justify-center'>
                      <Button color="danger" onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Aceptar
                      </Button>
                    </ModalFooter>
                  </ModalBody>
                </Tab>
                <Tab key="add_outcomes" title="Agregar Egresos">
                  <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                      <ModalBody>
                        <Input
                          autoFocus
                          label="Monto"
                          name="monto"
                          onChange={formik.handleChange}
                          value={formik.values.monto}
                          placeholder="Ingresa el monto del pago"
                        />
                        <Textarea
                          label="Detalle"
                          name="detalle"
                          onChange={formik.handleChange}
                          value={formik.values.detalle}
                          placeholder="Descripción del pago"
                        />
                      </ModalBody>
                      <ModalFooter className='flex justify-center'>
                        <Button color="danger" onPress={onClose}>
                          Cancelar
                        </Button>
                        <Button color="primary" type="submit">
                          Registrar Pago
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalBody>
                </Tab>
              </Tabs>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function EventModalInfo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

function VariousModalInfo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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