import { Contest } from "@/interfaces/Contest";
import { Talk } from "@/interfaces/Talk";
import { getContestsByID } from "@/services/contests.service";
import { getTalkById } from "@/services/talks.service";
import { useEffect, useState } from "react";

export default function TalkHook(id: string) {
  const [talk, setTalk] = useState<Talk[]>([]);

  useEffect(() => {
    getTalkById(id)
      .then((data) => {
        setTalk(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { talk, setTalk };
}
