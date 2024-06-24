import { Member } from "@/interfaces/Member";
import { memberSchema } from "@/schemas/member_schema";
import { useFormik } from "formik";
import { Participant } from "@/interfaces/Participant";
import {
  registerParticipant,
  updateParticipantCrud,
} from "../actions/membersTeamCrud";
import { participantSchema } from "@/schemas/participant_schema";

export default function FormikParticipant(
  participant: Participant | null,
  currentUser: any,
  callback: Function
) {
  const formik = useFormik({
    initialValues: {
      cedula: participant?.cedula || "",
      nombre: participant?.nombre || "",
      apellido: participant?.apellido || "",
      telefono: participant?.telefono || "",
      correo: participant?.correo || "",
      fechaNacimiento: participant?.fecha_nacimiento || "",
      estado: participant?.estado || "activo",
      id_team: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    validationSchema: participantSchema,
    onSubmit: (values) => {
      const participantLocal: Participant = {
        nombre: values.nombre,
        apellido: values.apellido,
        fecha_nacimiento: values.fechaNacimiento,
        cedula: values.cedula,
        correo: values.correo,
        telefono: values.telefono,
        estado: values.estado,
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
      };

      console.log(participantLocal);
      console.log(values.id_team);

      if (participant) {
        participantLocal.id = participant.id;
        console.log(participantLocal.id);

        updateParticipantCrud(participantLocal, formik);
        callback();

        return;
      } else {
        participantLocal.actualizado_por = null;

        console.log("Registrando miembro");
        registerParticipant(participantLocal, values.id_team, formik);
        callback();
      }
    },
  });

  return formik;
}
