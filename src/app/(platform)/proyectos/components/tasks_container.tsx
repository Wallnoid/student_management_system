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
import React from "react";
import { FaPlus } from "react-icons/fa";
import AddTaskModal from "./add_tasks_modal";

interface TaskContainerProps {
  project_id: string;
}

export default function TaskContainer({ project_id }: TaskContainerProps) {
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end">
          <h4>Pendientes</h4>
          
        </div>
      </div>
      <div className="flex flex-col gap-4">
      </div>
    </>
  );
}
