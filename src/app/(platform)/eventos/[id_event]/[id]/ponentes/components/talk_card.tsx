import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";
import { MdOutlineGroups } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { cutString } from "@/utils/utils";
import { statusColorMap } from "@/constants/constants";
import FormModal from "./form_modal_talker";
import { deleteTalkerCrud } from "../actions/talkerCrud";
import { SpeakerAuxiliar } from "@/interfaces/SpeakerAuxiliar";
export default function TalkerCard({
  talker,
  id_talk,
  id_event,
}: {
  talker: SpeakerAuxiliar;
  id_talk: string;
  id_event: string;
}) {
  return (
    <Card className="md:w-96 w-80  hover:bg-gray-50 active:bg-gray-200 cursor-pointer">
      <CardHeader className="flex gap-3">
        <div className=" h-11 w-11 rounded-xl bg-gray-300 items-center justify-center flex">
          <MdOutlineGroups className=" h-9 w-9 text-gray-600 " />
        </div>
        <div className="flex flex-col ">
          <p className="text-lg">
            {cutString(
              `${talker.speaker.nombre} ${talker.speaker.apellido}`,
              20
            )}
          </p>
          <p className="text-small text-default-500">{`${talker.speaker.nro_identificacion} `}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className=" flex flex-row text-xs justify-end">
          <p className=" text-default-400 pr-1">{talker.speaker.titulo}</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-row w-full">
          <Chip
            className="capitalize"
            color={statusColorMap[talker.speaker.estado]}
            size="sm"
            variant="flat"
          >
            {talker.speaker.estado}
          </Chip>

          <div className="w-full flex justify-end items-center gap-2">
            <FormModal
              talker={talker}
              id_talk={id_talk}
              id_event={id_event}
            ></FormModal>
            <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
              <MdDeleteOutline
                className="w-5 h-5 text-danger "
                onClick={() => deleteTalkerCrud(talker?.speaker)}
              ></MdDeleteOutline>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
