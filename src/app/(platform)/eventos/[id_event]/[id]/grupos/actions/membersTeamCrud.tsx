import AlertDelete from "@/components/shared/alert_delete";
import { addEvent, deleteEvent, updateEvent } from "@/services/events.service";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/Event";
import { Team } from "@/interfaces/Team";
import { addTeam, deleteTeam, updateTeam } from "@/services/teams.service";
import {
  addParticipant,
  deleteParticipant,
  updateParticipant,
} from "@/services/participants.service";
import { Participant } from "@/interfaces/Participant";

export const deleteParticipantCrud = async (
  participant: string,
  callback: Function
) => {
  console.log(participant);
  deleteParticipant("eliminado", participant)
    .then((data) => {
      console.log(data);
      callback();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateParticipantCrud = async (
  participant: Participant,
  formik: any
) => {
  toast.promise(updateParticipant(participant), {
    loading: "Saving...",
    success: () => {
      formik.resetForm();
      //onClose();
      //onReload!(true);
      window.location.reload();

      return <b>Integrante actualizado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      return `${err.message.toString()}`;
    },
  });
};

export const registerParticipant = async (
  participant: Participant,
  id_team: string,
  formik: any
) => {
  toast.promise(addParticipant(participant, id_team), {
    loading: "Saving...",
    success: () => {
      //   formik.resetForm();
      //   onClose();
      window.location.reload();

      return <b>Integrante guardado!</b>;
    },
    error: (err) => {
      formik.setSubmitting(false);
      console.log(err);
      return `${err.message.toString()}`;
    },
  });
};
