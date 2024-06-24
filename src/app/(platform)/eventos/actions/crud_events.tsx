import AlertDelete from "@/components/shared/alert_delete";
import { addEvent, deleteEvent, updateEvent } from "@/services/events.service";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/Event";

export const deleteEventCrud = async (event: Event) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(deleteEvent(event, "eliminado"), {
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

export const updateEventCrud = async (event: Event, formik: any) => {
  toast.promise(updateEvent(event), {
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

export const registerEvent = async (
  event: Event,
  formik: any,
  onClose: any
) => {
  toast.promise(addEvent(event), {
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
