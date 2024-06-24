import AlertDelete from "@/components/shared/alert_delete";
import { addEvent, deleteEvent, updateEvent } from "@/services/events.service";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/Event";
import { Team } from "@/interfaces/Team";
import { addTeam, deleteTeam, updateTeam } from "@/services/teams.service";
import { Talk } from "@/interfaces/Talk";
import { addTalk, deleteTalk, updateTalk } from "@/services/talks.service";

export const deleteTeamCrud = async (talk: Talk) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(deleteTalk(talk, "eliminado"), {
            loading: "Saving...",
            success: () => {
              window.location.reload();

              return <b>Charla Eliminado!</b>;
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

export const updateTalkCrud = async (talk: Talk, formik: any) => {
  toast.promise(updateTalk(talk), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();
      //onClose();
      //onReload!(true);
      window.location.reload();

      return <b>Charla actualizado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      return `${err.message.toString()}`;
    },
  });
};

export const registerTalk = async (talk: Talk, formik: any, onClose: any) => {
  toast.promise(addTalk(talk), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();
      onClose();
      window.location.reload();

      return <b>Charla guardado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      console.log(err);
      return `${err.message.toString()}`;
    },
  });
};
