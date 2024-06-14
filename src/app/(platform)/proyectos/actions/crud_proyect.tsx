import AlertDelete from "@/components/shared/alert_delete";
import {
  actualizarEstadoProyecto,
  actualizarProyecto,
  ingresarProyecto,
} from "@/services/proyectos.service";
import toast from "react-hot-toast";

export const deleteProject = async (id: string) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(actualizarEstadoProyecto(id, "eliminado"), {
            loading: "Saving...",
            success: () => {
              window.location.reload();

              return <b>Proyecto Eliminado!</b>;
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

export const updateProject = async (projectLocal: any, formik: any) => {
  toast.promise(actualizarProyecto(projectLocal), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();
      //onClose();
      //onReload!(true);
      window.location.reload();

      return <b>Proyecto Actualizado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      return `${err.message.toString()}`;
    },
  });
};

export const registerProject = async (projectLocal: any, formik: any) => {
  toast.promise(ingresarProyecto(projectLocal), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();

      window.location.reload();

      return <b>Proyecto Guardado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);

      return `${err.message.toString()}`;
    },
  });
};
