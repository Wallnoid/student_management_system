import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
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

export type renderCellType = { key: string; reactHelement: React.ReactElement };

export type StatusOptionsType = { name: string; uid: string };

export type columnsTableType = {
  name: string;
  uid: string;
  sortable?: boolean;
};

export type Entities = Member | ClubInternos | Proyecto; //agregar tipos necesario
