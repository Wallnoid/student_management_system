import AlertDelete from "@/components/shared/alert_delete";
import toast from "react-hot-toast";
import {
  addContest,
  deleteContest,
  updateContest,
} from "@/services/contests.service";
import { Contest } from "@/interfaces/Contest";

export const deleteContestCrud = async (contest: Contest) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(deleteContest(contest, "eliminado"), {
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

export const updateContestCrud = async (contest: Contest, formik: any) => {
  toast.promise(updateContest(contest), {
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

export const registerContest = async (
  contest: Contest,
  formik: any,
  onClose: any
) => {
  toast.promise(addContest(contest), {
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
