import AlertDelete from "@/components/shared/alert_delete";
import { addEvent, deleteEvent, updateEvent } from "@/services/events.service";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/Event";
import { Team } from "@/interfaces/Team";
import { addTeam, deleteTeam, updateTeam } from "@/services/teams.service";

export const deleteTeamCrud = async (team: Team) => {
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
              return `${err.message.toString()}`;
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

export const updateTeamCrud = async (team: Team, formik: any) => {
  toast.promise(updateTeam(team), {
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

export const registerTeam = async (team: Team, formik: any, onClose: any) => {
  toast.promise(addTeam(team), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();
      onClose();
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
