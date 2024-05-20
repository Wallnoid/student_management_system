import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import { ingresarProyecto } from "@/services/proyectos.service";
import { insertClub } from "@/services/clubes.service";
import { registerUser } from '@/services/users.service';


const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "DESCRIPCION", uid: "descripcion", sortable: true },
  { name: "UBICACION", uid: "ubicacion", sortable: true },
  { name: "PRESIDENTE", uid: "presidente", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

const statusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Inactivo", uid: "inactivo" },
  { name: "Suspendido", uid: "suspendido" },
];


export { columns, statusOptions };
