import { getEvents } from "@/services/events.service";
import { useEffect, useState } from "react";

export default function EventSHook(loading: boolean) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { events, setEvents };
}
