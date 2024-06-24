import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdDelete, MdOutlineGroupAdd } from "react-icons/md";
import FormModal from "./form_modal_participants";
import MembersTeamHook from "../hooks/team_members_hook";
import BooleanHook from "@/hooks/boolean_hook";

export default function ModalCrudMember({ id_team }: { id_team: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { boolean, setBoolean } = BooleanHook();

  const { teamMembers, setTeam } = MembersTeamHook(
    boolean,
    id_team,
    setBoolean
  );

  return (
    <>
      <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
        <MdOutlineGroupAdd
          className="w-5 h-5 text-primary "
          onClick={onOpen}
        ></MdOutlineGroupAdd>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"full"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1 text-2xl font-semibold text-default-500 items-center justify-center ">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className=" my-5 ">
                  <div className="flex flex-row items-center justify-between ">
                    <h2 className=" text-default-500 text-lg">Integrantes</h2>

                    <FormModal id_team={id_team}></FormModal>
                  </div>

                  <div className="flex flex-col gap-5 justify-start items-start  h-72  my-3 rounded-lg overflow-auto p-5  border border-gray-300">
                    <h4>Presidente</h4>
                    president
                    <div className="my-1"></div>
                    <h4>Miembros</h4>
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className=" flex flex-row  w-full justify-between items-center"
                      >
                        <h1>{member.nombre}</h1>

                        <MdDelete
                          className="mx-5 text-danger-500"
                          size={20}
                          onClick={() => {}}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
