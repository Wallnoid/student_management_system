import { getEventInfoById } from "@/services/events.service";
import { useEffect, useState } from "react";
import { Event } from "@/interfaces/Event";

export default function EventHook(loading: boolean, id: string) {
  const [event, setEvent] = useState<Event[]>([]);

  useEffect(() => {
    getEventInfoById(id)
      .then((data) => {
        setEvent(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { event, setEvent };
}
