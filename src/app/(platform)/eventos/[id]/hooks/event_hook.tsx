// import { getEvents } from "@/services/events.service";
// import { useEffect, useState } from "react";

// export default function EventHook(loading: boolean) {
//   const [event, setEvent] = useState<Event[]>([]);

//   useEffect(() => {
//     getEventById()
//       .then((data) => {
//         setEvent(data);
//         console.log(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [loading]);

//   return { events: event, setEvents: setEvent };
// }
