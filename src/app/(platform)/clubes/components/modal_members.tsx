import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { IoPersonAddOutline } from "react-icons/io5";
import InputSearch from "@/components/shared/input_search";
import MemberElementHook from "../hooks/members_hook";
import MemberClubHook from "../hooks/members_club_hook";
import { registerMemberOnClub } from "../actions/crud_club_membres";
import SelectedMemberHook from "../hooks/selected_member_hook";

export default function ModalMembers({ club }: { club: ClubInternos }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { members, setMembers } = MemberElementHook();

  const { selectedMember, setSelectedMember } = SelectedMemberHook();
  const { clubMembers, setClubMembers } = MemberClubHook(
    club.id,
    selectedMember
  );

  return (
    <>
      <Tooltip content="Agregar Miembros">
        <span
          className="text-lg text-default-500 cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <IoPersonAddOutline />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {club.nombre}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-3 items-center ">
                  <InputSearch
                    elements={members}
                    placeholder={"Buscar miembros"}
                    label="Buscar miembros"
                    name="search"
                    onChange={(value) => {
                      setSelectedMember(value);
                    }}
                    value={selectedMember}
                  ></InputSearch>

                  <Button
                    color="primary"
                    onPress={() => {
                      registerMemberOnClub(club, selectedMember);
                    }}
                    className=" h-14"
                  >
                    Agregar
                  </Button>
                </div>

                <div className=" my-5">
                  <h3>Miembros del club</h3>

                  <div className=" bg-slate-200 flex flex-col gap-3 justify-center h-72 my-3 rounded-lg overflow-auto">
                    {clubMembers}
                  </div>
                </div>
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
    </>
  );
}
