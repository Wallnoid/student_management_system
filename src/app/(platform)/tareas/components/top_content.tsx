'use client';
import { PlusIcon, SearchIcon } from "@/components/shared/icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddTaskModal from "./add_tasks_modal";
import { Proyecto } from "@/interfaces/Proyecto";
import { getSingleProject } from "@/services/proyectos.service";
import { getMembersClub } from "@/services/clubes.service";
import { Member } from "@/interfaces/Member";

interface TopContentProps {
  project_id: string;
}

export default function TopContent({ project_id }: TopContentProps) {
  const [project, setProject] = useState<Proyecto>();

  useEffect(() => {
    getSingleProject(project_id).then((project) => {{
      setProject(project);
    }})
    .catch((error) => {
      console.log(error);
    });
  }, [project_id]);



  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end">
          <h1 className="flex flex-col gap-1 text-xl font-bold">{project?.nombre}</h1>
          <div className="flex gap-3">
            <AddTaskModal proyect={project}/> 
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
      </div>
    </>
  );
}
