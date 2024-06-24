import { Contest } from "@/interfaces/Contest";
import { getContests } from "@/services/contests.service";
import { getEvents } from "@/services/events.service";
import { getTalks } from "@/services/talks.service";
import { useEffect, useState } from "react";

export default function ContestHook(id: string, loading: boolean) {
  const [contests, setContest] = useState<Contest[]>([]);

  useEffect(() => {
    getContests(id)
      .then((data) => {
        setContest(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { contests, setContest };
}
