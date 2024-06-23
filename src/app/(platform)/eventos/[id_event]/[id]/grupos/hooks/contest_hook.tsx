import { Contest } from "@/interfaces/Contest";
import { getContests, getContestsByID } from "@/services/contests.service";
import { getEvents } from "@/services/events.service";
import { getTalks } from "@/services/talks.service";
import { useEffect, useState } from "react";

export default function ContestHook(id: string) {
  const [contest, setContest] = useState<Contest>();

  useEffect(() => {
    getContestsByID(id)
      .then((data) => {
        setContest(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { contest, setContest };
}
