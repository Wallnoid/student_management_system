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
import {
  deleteMemberSelected,
  registerMemberOnClub,
} from "../actions/crud_club_membres";
import SelectedMemberHook from "../hooks/selected_member_hook";
import { MdDelete } from "react-icons/md";
import BooleanHook from "@/hooks/boolean_hook";

export default function ModalMembers({ club }: { club: ClubInternos }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { boolean, setBoolean } = BooleanHook();

  const { members, setMembers } = MemberElementHook();

  const { selectedMember, setSelectedMember } = SelectedMemberHook();
  const { clubMembers, setClubMembers, president, setPresident } =
    MemberClubHook(club.id, boolean, setBoolean);

  return (
    <>
      <Tooltip content="Agregar Miembros ">
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
                      registerMemberOnClub(club, selectedMember).then(
                        (data) => {
                          setBoolean(true);
                        }
                      );
                    }}
                    className=" h-14"
                  >
                    Agregar
                  </Button>
                </div>

                <div className=" my-5">
                  <h3>Miembros del club</h3>

                  <div className="flex flex-col gap-5 justify-start items-start  h-72  my-3 rounded-lg overflow-auto p-5  border border-gray-300">
                    <h4>Presidente</h4>
                    {president}
                    <div className="my-1"></div>
                    <h4>Miembros</h4>
                    {clubMembers.map((member) => (
                      <div
                        key={member.key}
                        className=" flex flex-row  w-full justify-between items-center"
                      >
                        {member}

                        <MdDelete
                          id={`deleteButton_${member.key}__$`}
                          className="mx-5 text-danger-500"
                          size={20}
                          onClick={() => {
                            deleteMemberSelected(member.key, () => {
                              setBoolean(true);
                            });
                          }}
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
