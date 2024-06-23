import { getTalksByEventId } from "@/services/talks.service";
import { useEffect, useState } from "react";

export default function TalksHook(id: string, loading: boolean) {
  const [talks, setTalks] = useState<Event[]>([]);

  useEffect(() => {
    getTalksByEventId(id)
      .then((data) => {
        setTalks(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { talks, setTalks };
}
