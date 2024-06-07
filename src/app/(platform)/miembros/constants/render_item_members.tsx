import { renderCellType } from "@/app/types/types";
import { DeleteIcon, EditIcon, MemberIcon } from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { cutString } from "@/utils/utils";
import { Chip, Tooltip, User } from "@nextui-org/react";
import { statusColorMap } from "./constants";
import InfoMembers from "../components/info_member";
import FormModal from "../components/form_modal";
import { deleteUser } from "../actions/crud_member";

export default function renderItems(
  user: Member,
  cellValue: any
): renderCellType[] {
  return [
    {
      key: "nombre",
      reactHelement: (
        <User
          avatarProps={{
            radius: "lg",
            showFallback: true,
            src: "https://images.unsplash.com/broken",
            fallback: <MemberIcon />,
          }}
          description={user.correo}
          name={cutString(cellValue + " " + user.apellido, 20)}
        >
          {user.correo}
        </User>
      ),
    },
    {
      key: "categoria",
      reactHelement: (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {user.categoria}
          </p>
        </div>
      ),
    },
    {
      key: "estado",
      reactHelement: (
        <Chip
          className="capitalize"
          color={statusColorMap[user.estado]}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      ),
    },
    {
      key: "actions",
      reactHelement: (
        <div className="relative flex items-center gap-2">
          <InfoMembers member={user}></InfoMembers>

          <FormModal icon={<EditIcon />} member={user}></FormModal>

          <Tooltip color="danger" content="Eliminar Miembro">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deleteUser(user!.id ?? "")}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
}
