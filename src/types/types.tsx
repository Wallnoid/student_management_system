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