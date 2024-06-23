import { ClubInternos } from "@/interfaces/ClubInternos";
import { useFormik } from "formik";
import { registerEvent, updateEventCrud } from "../actions/crud_events";
import { es } from "date-fns/locale";
import { clubSchema } from "@/schemas/clubes_schema";
import { Member } from "@/interfaces/Member";
import { Event } from "@/interfaces/Event";
import { eventsSchema } from "@/schemas/events_schema";

export default function FormikEvents(
  event: Event | null,
  currentUser: any,
  onClose: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: event?.nombre || "",
      descripcion: event?.descripcion || "",
      responsable: (event?.responsable as Member)?.id || "",
      fecha_inicio: event?.fecha_inicio || "",
      fecha_fin: event?.fecha_fin || "",
      estado: event?.estado || "activo",
    },
    validationSchema: eventsSchema(),
    onSubmit: (values) => {
      console.log(values);
      const eventLocal: Event = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        responsable: values.responsable,
        fecha_inicio: values.fecha_inicio,
        fecha_fin: values.fecha_fin,
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
        estado: values.estado,
      };
      if (event) {
        eventLocal.id = event.id;
        updateEventCrud(eventLocal, formik);
        return;
      } else {
        eventLocal.actualizado_por = null;
        registerEvent(eventLocal, formik, onClose);
      }
    },
  });

  return formik;
}
