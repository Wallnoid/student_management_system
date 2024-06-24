import AlertDelete from "@/components/shared/alert_delete";
import toast from "react-hot-toast";

import { addTalk, deleteTalk, updateTalk } from "@/services/talks.service";
import { Speaker } from "@/interfaces/Speaker";
import { addSpeakerToTalk, updateSpeaker } from "@/services/speakers.service";

export const deleteTalkerCrud = async (talker: Speaker) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(deleteTalk(talker, "eliminado"), {
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

export const updateTalkerCrud = async (
  talker: Speaker,
  charla_id: string,
  costo: string,
  formik: any
) => {
  toast.promise(updateSpeaker(talker, charla_id, costo), {
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

export const registerTalker = async (
  talker: Speaker,
  id_talk: string,
  costo: number,
  formik: any,
  id_event: string
) => {
  toast.promise(addSpeakerToTalk(talker, id_talk, "", costo, id_event), {
    loading: "Saving...",
    success: () => {
      // formik.resetForm();
      // onClose();
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
