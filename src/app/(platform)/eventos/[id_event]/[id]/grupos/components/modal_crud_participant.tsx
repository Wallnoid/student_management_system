import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { MdDelete, MdOutlineGroupAdd } from "react-icons/md";
import FormModal from "./form_modal_participants";
import MembersTeamHook from "../hooks/team_members_hook";
import BooleanHook from "@/hooks/boolean_hook";
import { cutString } from "@/utils/utils";
import { FaUser } from "react-icons/fa6";
import { deleteParticipantCrud } from "../actions/membersTeamCrud";
import { FiEdit2 } from "react-icons/fi";

export default function ModalCrudMember({ id_team }: { id_team: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { boolean, setBoolean } = BooleanHook();

  const { teamMembers, setMembersTeam, getMember } = MembersTeamHook(
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
                Miembros
              </ModalHeader>
              <ModalBody>
                <div className=" my-5 ">
                  <div className="flex flex-row items-center justify-between ">
                    <h2 className=" text-default-500 text-lg">Integrantes</h2>

                    <FormModal
                      id_team={id_team}
                      callback={() => setBoolean(true)}
                    ></FormModal>
                  </div>

                  <div className="flex flex-col gap-5 justify-start items-start  h-72  my-3 rounded-lg overflow-auto p-5 py-3  border border-gray-300">
                    <h4>Miembros</h4>

                    {!teamMembers.participantes ? (
                      <div className="flex flex-row w-full">
                        <p className="text-default-500">
                          No hay miembros en este equipo
                        </p>
                      </div>
                    ) : (
                      teamMembers?.participantes?.map((participante) => (
                        <div
                          key={participante.id}
                          className=" flex flex-row w-full justify-between items-center rounded-lg shadow-md p-2 bg-gray-100"
                        >
                          <User
                            avatarProps={{
                              radius: "lg",
                              showFallback: true,
                              src: "https://images.unsplash.com/broken",
                              fallback: (
                                <FaUser size={25} className=" text-primary" />
                              ),
                            }}
                            description={participante.participante.correo}
                            name={cutString(
                              participante.participante.nombre +
                                " " +
                                participante.participante.apellido,
                              20
                            )}
                          >
                            {participante.participante.correo}
                          </User>

                          <div className="flex flex-row items-center gap-2">
                            <FormModal
                              participant={participante.participante}
                              id_team={id_team}
                              callback={() => setBoolean(true)}
                            ></FormModal>

                            <MdDelete
                              id={`deleteButton_${participante.participante.id}__$`}
                              className="mx-5 text-danger-500"
                              size={20}
                              onClick={() => {
                                deleteParticipantCrud(
                                  participante.participante.id,
                                  () => {
                                    setBoolean(true);
                                    console.log("deleted");
                                  }
                                );
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
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
