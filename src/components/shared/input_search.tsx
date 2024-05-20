import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Clubes } from "@/app/(platform)/proyectos/components/form_modal";

type Data = Clubes;

export default function InputSearch({ datas }: { datas: Data[] }) {
  return (
    <Autocomplete
      defaultItems={datas}
      label="Club asignado"
      placeholder="Buscar Club"
      className="flex"
      variant="bordered"
    >
      {(data) => (
        <AutocompleteItem key={data.id} textValue={data.nombre}>
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {data.presidente.nombre + " " + data.presidente.apellido}
            </p>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];
