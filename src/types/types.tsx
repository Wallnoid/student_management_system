import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import { Team } from "@/interfaces/Team";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Presidente = {
  nombre: string;
  apellido: string;
};

export type Clubes = {
  id: string;
  nombre: string;
  presidente: Presidente;
};

export type TeamsContestResponse = {
  team: Team;
  costo: number;
};

export type PresidenteWithRole = {
  id: string;
  nombre: string;
  apellido: string;
  categoria: string;
  correo: string;
};

export type RespondClubMember = {
  actualizado_por: any;
  comentario_asignacion: string;
  creado_por: any;
  estado: string;
  fecha_hora_actualizacion: string;
  fecha_hora_creacion: string;
  id: string;
  miembro_club: ClubMember;
};

export type ClubMember = {
  id: string;
  nombre: string;
  apellido: string;
  categoria: string;
  correo: string;
};

export type renderCellType = { key: string; reactHelement: React.ReactElement };

export type StatusOptionsType = { name: string; uid: string };

export type columnsTableType = {
  name: string;
  uid: string;
  sortable?: boolean;
};

export type Entities = Member | ClubInternos | Proyecto; //agregar tipos necesario
