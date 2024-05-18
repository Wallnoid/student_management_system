import { Member } from "@/interfaces/Member";
import { registerUser } from '@/services/users.service';


const columns = [
  { name: "ID", uid: "nro_identificacion", sortable: true },

  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "ROL", uid: "categoria", sortable: true },
  { name: "TELEFONO", uid: "telefono" },
  { name: "EMAIL", uid: "correo" },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Inactivo", uid: "inactivo" },
  { name: "Suspendido", uid: "suspendido" },
];

export async function insert(member: Member){
  registerUser(member).then( res => {
    console.log(res);
  }).catch(err => {
    console.log(err.message);
  });
}

export { columns, statusOptions };
