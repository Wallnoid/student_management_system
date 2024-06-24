'use client';
import { createClient as supabase } from "@/supabase/client";
import React, { useEffect, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { GiPodiumWinner, GiPublicSpeaker } from "react-icons/gi";
import { usePayments } from '../../paymentsContext';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, DatePicker, Input, Textarea, DateValue, Link, RadioGroup, Radio } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Payments } from '@/interfaces/Payments';
import { Participation } from '@/interfaces/Participation';
import { Contest } from '@/interfaces/Contest';
import { Event } from '@/interfaces/Event';
import { Team } from '@/interfaces/Team';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { addPyment } from '@/services/payments.service';
import SelectUsers from '@/app/(platform)/tareas/components/selectUsers';
import { parseDate } from '@/utils/utils';
import { currentDate } from '@/constants/date_constants';
import { Member } from '@/interfaces/Member';
import { SupabaseClient } from '@supabase/supabase-js';

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
          <div id="card_concursos" className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_contest_button')}>
            <GiPodiumWinner className="text-xl text-white" />
            <p className="text-xs font-bold mt-2 text-white">Concursos</p>
          </div>
        </div>
        <div className=" grow p-2">
          <div id="card_charlas" className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_event_button')}>
            <GiPublicSpeaker className="text-xl text-white" />
            <p className="text-xs font-bold mt-2 text-white">Charlas</p>
          </div>
        </div>
        <div className=" grow p-2">
          <div id="card_otros" className="border-2 rounded-md p-2 flex flex-col items-center justify-center bg-primary hover:bg-secondary cursor-pointer"
            onClick={() => handleClick('modal_various_button')}>
            <FaQuestion className="text-xl text-white" />
            <p className="text-xs font-bold mt-2 text-white">Otros</p>
          </div>
        </div>
      </div>
      <ContestModalInfo payments={contestPayments} />
      <EventModalInfo payments={eventPayments} />
      <VariousModalInfo payments={variousPayments} />
    </>
  );
}

function ContestModalInfo({ payments }: { payments: Payments[] }) {
  const [actualUser, setActualUser] = useState<string>()

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await supabase().auth.getUser();
      setActualUser(user?.data.user.id);
    }
    fetchUserData();
  }, []);


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
        id_participacion: 'ba512c65-ceea-4333-9c20-3909fb9a888d',
        creado_por: actualUser,
        actualizado_por: actualUser,
      };
      toast.promise(addPyment(payment, 'concursos'), {
        loading: "Guardando...",
        success: () => {
          console.log("Pago registrado correctamente!");
          formik.resetForm();
          window.location.reload();
          return <b>Pago Registrado</b>;
        },
        error: (err) => {
          formik.setSubmitting(false);
          return `${err.message.toString()}`;
        },
      });
    },
  });
  const handleNumericChange = (e) => {
    const { value, name } = e.target;
    const formattedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2})\d+/, '$1');
    formik.setFieldValue(name, formattedValue);
  };

  return (
    <div>
      <Toaster />
      <Button className='hidden' onPress={onOpen} id={'modal_contest_button'}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" scrollBehavior={'outside'}>
        <ModalContent>
          {(onClose) => (
            <>
              <Tabs aria-label="Options" className='w-full pt-12 justify-center'>
                <Tab key="transactions_list" title="Lista de Transacciones">
                  <div className="flex flex-col h-full">
                    <ModalBody className="flex-1 overflow-y-auto">
                      {
                        payments?.map((payment, index) => (
                          <Card key={index} className="mb-2">
                            <CardBody>
                              <div className="text-gray-800 text-sm space-y-2">
                                <div className="flex justify-between items-center p-2">
                                  <p><strong>Monto:</strong> ${payment.monto.toFixed(2)}</p>
                                  <div className={`rounded-full px-3 rounded-md text-white ${payment.tipo === 'ingreso' ? 'bg-secondary' : 'bg-error'}`}>
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
                  </div>
                </Tab>
                <Tab key="add_outcomes" title="Agregar Egresos">
                  <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                      <ModalBody>
                        <Input
                          autoFocus
                          label="Monto"
                          name="monto"
                          onChange={handleNumericChange}
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

function EventModalInfo({ payments }: { payments: Payments[] }) {
  const [actualUser, setActualUser] = useState<string>()

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await supabase().auth.getUser();
      setActualUser(user?.data.user.id);
    }
    fetchUserData();
  }, []);


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
        id_evento: '23077517-f1c8-405d-b73e-098283b3a9c3',
        fecha_hora_creacion: currentDate,
        creado_por: actualUser,
        actualizado_por: actualUser,
      };
      toast.promise(addPyment(payment, 'eventos'), {
        loading: "Guardando...",
        success: () => {
          console.log("Pago registrado correctamente!");
          formik.resetForm();
          window.location.reload();
          return <b>Pago Registrado</b>;
        },
        error: (err) => {
          formik.setSubmitting(false);
          return `${err.message.toString()}`;
        },
      });
    },
  });
  const handleNumericChange = (e) => {
    const { value, name } = e.target;
    const formattedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2})\d+/, '$1');
    formik.setFieldValue(name, formattedValue);
  };

  console.log(payments);

  return (
    <div>
      <Toaster />
      <Button className='hidden' onPress={onOpen} id={'modal_event_button'}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" scrollBehavior={'outside'}>
        <ModalContent>
          {(onClose) => (
            <>
              <Tabs aria-label="Options" className='w-full pt-12 justify-center'>
                <Tab key="transactions_list" title="Lista de Transacciones">
                  <div className="flex flex-col h-full">
                    <ModalBody className="flex-1 overflow-y-auto">
                      {
                        payments?.map((payment, index) => (
                          <Card key={index} className="mb-2">
                            <CardBody>
                              <div className="text-gray-800 text-sm space-y-2">
                                <div className="flex justify-between items-center p-2">
                                  <p><strong>Monto:</strong> ${payment.monto.toFixed(2)}</p>
                                  <div className={`rounded-full px-3 rounded-md text-white ${payment.tipo === 'ingreso' ? 'bg-secondary' : 'bg-error'}`}>
                                    <p>{payment.tipo.toUpperCase()}</p>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                  <p><strong>Evento:</strong> {String((payment.id_evento as Event).nombre)}</p>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                  <p><strong>Detalle:</strong> {String(payment.detalle)}</p>
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
                  </div>
                </Tab>
                <Tab key="add_outcomes" title="Agregar Egresos">
                  <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                      <ModalBody>
                        <Input
                          autoFocus
                          label="Monto"
                          name="monto"
                          onChange={handleNumericChange}
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

function VariousModalInfo({ payments }: { payments: Payments[] }) {
  const [actualUser, setActualUser] = useState<string>()
  const [selected, setSelected] = React.useState("ingreso");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await supabase().auth.getUser();
      setActualUser(user?.data.user.id);
    }
    fetchUserData();
  }, []);


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
        tipo: selected,
        detalle: values.detalle,
        fecha_hora_creacion: currentDate,
        creado_por: actualUser,
        actualizado_por: actualUser,
      };
      toast.promise(addPyment(payment, 'varios'), {
        loading: "Guardando...",
        success: () => {
          console.log("Pago registrado correctamente!");
          formik.resetForm();
          window.location.reload();
          return <b>Pago Registrado</b>;
        },
        error: (err) => {
          formik.setSubmitting(false);
          return `${err.message.toString()}`;
        },
      });
    },
  });
  const handleNumericChange = (e) => {
    const { value, name } = e.target;
    const formattedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.\d{2})\d+/, '$1');
    formik.setFieldValue(name, formattedValue);
  };

  console.log(payments);

  return (
    <div>
      <Toaster />
      <Button className='hidden' onPress={onOpen} id={'modal_various_button'}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" scrollBehavior={'outside'}>
        <ModalContent>
          {(onClose) => (
            <>
              <Tabs aria-label="Options" className='w-full pt-12 justify-center'>
                <Tab id="tab_lista_transacciones" key="transactions_list" title="Lista de Transacciones">
                  <div className="flex flex-col h-full">
                    <ModalBody className="flex-1 overflow-y-auto">
                      {
                        payments?.map((payment, index) => (
                          <Card key={index} className="mb-2">
                            <CardBody>
                              <div className="text-gray-800 text-sm space-y-2">
                                <div className="flex justify-between items-center p-2">
                                  <p><strong>Monto:</strong> ${payment.monto.toFixed(2)}</p>
                                  <div className={`rounded-full px-3 rounded-md text-white ${payment.tipo === 'ingreso' ? 'bg-secondary' : 'bg-error'}`}>
                                    <p>{payment.tipo.toUpperCase()}</p>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                  <p><strong>Detalle:</strong> {String(payment.detalle)}</p>
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
                  </div>
                </Tab>
                <Tab key="add_outcomes" id="tab_agregar_pagos" title="Agregar Ingresos-Egresos">
                  <ModalBody>
                    <form onSubmit={formik.handleSubmit}>
                      <ModalBody>
                        <Input
                          autoFocus
                          label="Monto"
                          name="monto"
                          onChange={handleNumericChange}
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
                        <div className="flex flex-col gap-3 px-4">
                          <RadioGroup
                            value={selected}
                            onValueChange={setSelected}
                            orientation="horizontal"
                            size="sm"
                          >
                            <Radio value="ingreso" id="radio_ingreso">Ingreso</Radio>
                            <Radio value="egreso" id="radio_egreso" >Egreso</Radio>
                          </RadioGroup>
                        </div>
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