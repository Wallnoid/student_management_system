import AlertDelete from "@/components/shared/alert_delete";
import { ClubInternos } from "@/interfaces/ClubInternos";
import {
  insertClub,
  updateClub,
  updateEstadoClub,
} from "@/services/clubes.service";
import toast from "react-hot-toast";

export const deleteClub = async (id: string) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(updateEstadoClub(id, "eliminado"), {
            loading: "Saving...",
            success: () => {
              window.location.reload();

              return <b>Club Eliminado!</b>;
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

export const updateClubs = async (clubLocal: ClubInternos, formik: any) => {
  toast.promise(updateClub(clubLocal), {
    loading: "Saving...",
    success: () => {
      console.log("Miembro actualizado!");
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

export const registerClub = async (clubLocal: ClubInternos, formik: any) => {
  toast.promise(insertClub(clubLocal), {
    loading: "Saving...",
    success: () => {
      console.log("Miembro guardado!");
      formik.resetForm();
      //onClose();
      //onReload!(true);
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
