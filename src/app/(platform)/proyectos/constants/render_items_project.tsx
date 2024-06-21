import {
  DeleteIcon,
  EditIcon,
  MemberIcon,
  ProjectIcon,
} from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { cutString } from "@/utils/utils";
import { Chip, Tooltip, User as Project } from "@nextui-org/react";
import { statusColorMap } from "./constants";
import FormModal from "../components/form_modal";
import { Proyecto } from "@/interfaces/Proyecto";
import { ClubInternos } from "@/interfaces/ClubInternos";
import InfoProject from "../components/info_proyect";
import { deleteProject } from "../actions/crud_proyect";
import { MdChecklistRtl } from "react-icons/md";
import { goToTasks } from "../actions/tasks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { renderCellType } from "@/types/types";
import { RiProjectorFill } from "react-icons/ri";

export default function renderItems(
  project: Proyecto,
  cellValue: any,
  router: AppRouterInstance
): renderCellType[] {
  return [
    {
      key: "nombre",
      reactHelement: (
        <Project
          avatarProps={{
            radius: "lg",
            showFallback: true,
            src: "https://images.unsplash.com/broken",
            fallback: <RiProjectorFill size={25} className=" text-primary" />,
          }}
          //description={proyect.responsable.nombre}
          name={cutString(cellValue as string, 20)}
        ></Project>
      ),
    },
    {
      key: "responsable",
      reactHelement: (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {cellValue
              ? (cutString((cellValue as ClubInternos).nombre, 15) as string)
              : ""}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {cutString(
              ((project.responsable as ClubInternos).presidente as Member)
                .nombre +
                " " +
                ((project.responsable as ClubInternos).presidente as Member)
                  .apellido,
              20
            )}
          </p>
        </div>
      ),
    },
    {
      key: "estado",
      reactHelement: (
        <Chip
          className="capitalize"
          color={statusColorMap[project.estado]}
          size="sm"
          variant="flat"
        >
          {cellValue as string}
        </Chip>
      ),
    },
    {
      key: "actions",
      reactHelement: (
        <div className="relative flex items-center gap-2">
          <InfoProject proyect={project}></InfoProject>

          <FormModal
            project={project as Proyecto}
            icon={<EditIcon />}
          ></FormModal>

          <Tooltip color="danger" content="Eliminar Proyecto">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deleteProject(project!.id ?? "")}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
          <Tooltip content="Agregar Tareas">
            <span
              className="text-lg cursor-pointer active:opacity-50"
              onClick={() => goToTasks(project!.id ?? "", router)}
            >
              <MdChecklistRtl color="grey" />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
}
