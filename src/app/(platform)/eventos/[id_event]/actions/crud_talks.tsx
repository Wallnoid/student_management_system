import AlertDelete from "@/components/shared/alert_delete";
import { ClubInternos } from "@/interfaces/ClubInternos";
import {
  insertClub,
  updateClub,
  updateEstadoClub,
} from "@/services/clubes.service";
import { deleteEvent } from "@/services/events.service";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/Event";
import { addTalk, deleteTalk, updateTalk } from "@/services/talks.service";
import { Talk } from "@/interfaces/Talk";

export const deleteTalkCrud = async (talk: Talk) => {
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

              return <b>Evento Eliminado!</b>;
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

export const updateTalkCrud = async (Talk: Talk, formik: any) => {
  toast.promise(updateTalk(Talk), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();
      //onClose();
      //onReload!(true);
      window.location.reload();

      return <b>Club actualizado!</b>;
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
      console.log("Miembro guardado!");
      formik.resetForm();
      onClose();
      window.location.reload();

      return <b>Miembro guardado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      console.log(err);
      return `${err.message.toString()}`;
    },
  });
};
