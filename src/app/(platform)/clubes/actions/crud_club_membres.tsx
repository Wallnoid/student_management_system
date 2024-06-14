import { AsignacionesClubes } from "@/interfaces/AsignacionesClubes";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { addMemberToClub, insertClub } from "@/services/clubes.service";
import { currentUser } from "@/services/users.service";
import toast from "react-hot-toast";

export const registerMemberOnClub = async (
  club: ClubInternos,
  idMember: string
) => {
  console.log(currentUser.id);
  const asignacionClub: AsignacionesClubes = {
    id_club_interno: club.id,
    id_miembro: idMember,
    fecha_hora_creacion: "NOW()",
    creado_por: currentUser.user.id,
    estado: "activo",
  };

  if (idMember === "") {
    toast.error("Escoja un miembro");
    return;
  }

  toast.promise(addMemberToClub(asignacionClub), {
    loading: "Saving...",
    success: () => {
      return <b>Miembro guardado!</b>;
    },
    error: (err) => {
      return `${err.message.toString()}`;
    },
  });
};
