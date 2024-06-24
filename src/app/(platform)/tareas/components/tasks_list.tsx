'use client';

import { useEffect, useState } from "react";
import { Task } from "@/interfaces/Task";
import { getTaskByProject, getTasks, updateTaskStatus } from "@/services/task.service";
import { Button, Chip } from "@nextui-org/react";
import '../styles/styles-tasks.css'
import { FaCaretRight, FaEye, FaRegEdit } from "react-icons/fa";
import { DeleteIcon } from "@/components/shared/icons";
import AlertDelete from "@/components/shared/alert_delete";
import toast, { Toaster } from "react-hot-toast";
import { Member } from "@/interfaces/Member";
interface TaskContainerProps {
  title: string;
  tasks: Task[];
}

const onDelete = (id: string) => {
  toast.custom(
    (t) => (
      <AlertDelete
        onCancel={() => {
          toast.dismiss(t.id);
        }}
        onSubmit={() => {
          toast.promise(updateTaskStatus(id, "Eliminado"), {
            loading: "Actualizando...",
            success: () => {
              window.location.reload();
              return <b>Tarea eliminada</b>;
            },
            error: (err) => {
              return `${err.message.toString()}`;
            },
          });

          toast.dismiss(t.id);
        }}
        visible={t.visible}
      ></AlertDelete>
    ),
    { duration: Infinity }
  );
}

const onUpdate = (id: string, status: string) => {
  updateTaskStatus(id, status).then(() => {
    window.location.reload();
  }).catch((error) => {
    console.log(error);
  });
}

const taskStatus = (task: Task) => {
  if(task.estado === 'activa'){
    return 'en progreso';
  }else if(task.estado === 'en progreso'){
    return 'completada';
  }
  return 'activa';
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
            {/* <span
              className="text-lg cursor-pointer active:opacity-50"
              onClick={() => { }}
            >
              <FaRegEdit />
            </span> */}
            <span
              id={`delete_${task.id}`}
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {onDelete(task.id)}}
            >
              <DeleteIcon  />
            </span>
            <span
              className="text-lg cursor-pointer active:opacity-50"
              onClick={() => {onUpdate(task.id,taskStatus(task))}}
            >
              <FaCaretRight />
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function TasksList({ id }: { id: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    getTaskByProject(id).then((tasks) => {
      setTasks(tasks);
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(tasks);



  const pendingTasks = tasks.filter(task => task.estado === 'activa');
  console.log(pendingTasks);
  const inProgressTasks = tasks.filter(task => task.estado === 'en progreso');
  const completedTasks = tasks.filter(task => task.estado === 'completada');

  return (
    <>
      <Toaster />
      <div className="flex flex-col md:flex-row gap-4">
        <TaskContainer title="Activa" tasks={pendingTasks} />
        <TaskContainer title="En Progreso" tasks={inProgressTasks} />
        <TaskContainer title="Completedas" tasks={completedTasks} />
      </div>

    </>

  );
}
