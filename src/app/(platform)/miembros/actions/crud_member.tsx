import AlertDelete from "@/components/shared/alert_delete";
import { Member } from "@/interfaces/Member";
import { updateMemberStatus } from "@/services/members.service";
import { registerUser, updateRole } from "@/services/users.service";
import toast from "react-hot-toast";

export const deleteUser = async (id: string) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(updateMemberStatus(id, "eliminado"), {
            loading: "Saving...",
            success: () => {
              window.location.reload();

              return <b>Miembro Eliminado!</b>;
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

export const updateMember = async (memberLocal: Member, formik: any) => {
  toast.promise(updateRole(memberLocal), {
    loading: "Saving...",
    success: () => {
      console.log("Miembro actualizado!");
      formik.resetForm();
      //onClose();
      //onReload!(true);
      window.location.reload();

      return <b>Miembro actualizado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      return `${err.message.toString()}`;
    },
  });
};

export const registerMember = async (memberLocal: Member, formik: any) => {
  toast.promise(registerUser(memberLocal), {
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
