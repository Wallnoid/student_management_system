'use client';

import { useEffect, useState } from "react";
import { Task } from "@/interfaces/Task";
import { getTaskByProject, getTasks } from "@/services/task.service";
import { Button, Chip } from "@nextui-org/react";
import '../styles/styles-tasks.css'
import { FaEye, FaRegEdit } from "react-icons/fa";
import { DeleteIcon } from "@/components/shared/icons";
import AlertDelete from "@/components/shared/alert_delete";
import toast from "react-hot-toast";
interface TaskContainerProps {
  title: string;
  tasks: Task[];
}


const TaskContainer: React.FC<TaskContainerProps> = ({ title, tasks }) => (
  <div className="w-full md:w-1/3 bg-white shadow-md border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto scrollbar-custom">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-gray-100 p-2 rounded-lg relative flex items-center gap-2 justify-between">
          <Chip>
            {task.nombre}
          </Chip>
          <div className="relative flex items-center gap-2">
            <span
              className="text-lg cursor-pointer active:opacity-50"
              onClick={() => { }}
            >
              <FaEye />
            </span>
            <span
              className="text-lg cursor-pointer active:opacity-50"
              onClick={() => { }}
            >
              <FaRegEdit />
            </span>
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {}}
            >
              <DeleteIcon />
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function TasksList({ id }: { id: string}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTaskByProject(id).then((tasks) => {
      setTasks(tasks);
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const pendingTasks = tasks.filter(task => task.estado === 'Activa');
  const inProgressTasks = tasks.filter(task => task.estado === 'En Progreso');
  const completedTasks = tasks.filter(task => task.estado === 'Completada');

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <TaskContainer title="Activa" tasks={pendingTasks}/>
      <TaskContainer title="En Progreso" tasks={inProgressTasks} />
      <TaskContainer title="Completedas" tasks={completedTasks} />
    </div>
  );
}
