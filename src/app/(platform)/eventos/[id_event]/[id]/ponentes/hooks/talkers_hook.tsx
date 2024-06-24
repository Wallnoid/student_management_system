import { Speaker } from "@/interfaces/Speaker";
import { Talk } from "@/interfaces/Talk";
import { getSpeakersByTalkID } from "@/services/speakers.service";
import { getTalkById } from "@/services/talks.service";
import { useEffect, useState } from "react";

export default function TalkersHook(id: string) {
  const [talkers, setTalkers] = useState<Speaker[]>([]);

  useEffect(() => {
    getSpeakersByTalkID(id)
      .then((data) => {
        setTalkers(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { talkers, setTalkers };
}
