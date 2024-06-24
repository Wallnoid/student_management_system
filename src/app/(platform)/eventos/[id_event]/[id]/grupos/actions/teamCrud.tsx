import AlertDelete from "@/components/shared/alert_delete";
import { addEvent, deleteEvent, updateEvent } from "@/services/events.service";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/Event";
import { Team } from "@/interfaces/Team";
import {
  addTeam,
  addTeamParticipation,
  deleteTeam,
  updateTeam,
} from "@/services/teams.service";

export const deleteTeamCrud = async (team: Team) => {
  console.log(team);

  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(deleteTeam(team, "eliminado"), {
            loading: "Saving...",
            success: () => {
              window.location.reload();

              return <b>Equipo Eliminado!</b>;
            },
            error: (err) => {
              console.log(err);
              return `${err.message.toString()} ${team.id}`;
            },
          });

          toast.dismiss(t.id);
        }}
        visible={t.visible}
      ></AlertDelete>
    ),
    { duration: Infinity }
  );
};

export const updateTeamCrud = async (
  team: Team,
  costo: number,
  id_concurso: string,
  formik: any
) => {
  toast.promise(updateTeam(team, costo, id_concurso), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();
      //onClose();
      //onReload!(true);
      window.location.reload();

      return <b>Equipo actualizado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      return `${err.message.toString()}`;
    },
  });
};

export const registerTeam = async (
  team: Team,
  id_contest: string,
  costo: number,
  formik: any,
  onClose: any
) => {
  toast.promise(addTeamParticipation(team, id_contest, costo), {
    loading: "Saving...",
    success: () => {
      // formik.resetForm();
      // onClose();
      window.location.reload();

      return <b>Equipo guardado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      console.log(err);
      return `${err.message.toString()}`;
    },
  });
};
