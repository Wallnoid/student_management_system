import { Proyecto } from "@/interfaces/Proyecto";
import { getProyectos } from "@/services/proyectos.service";
import { useEffect, useState } from "react";

export default function ProjectHook(loading: boolean) {
  const [projects, setProjects] = useState<Proyecto[]>([]);

  useEffect(() => {
    getProyectos()
      .then((data) => {
        setProjects(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { projects, setProjects };
}
