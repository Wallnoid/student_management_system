import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { ChevronDownIcon } from "./icons";
import { capitalize } from "../utils/utils";

export default function DefaultDropdown({
  selectedValue,
  selectedKeys,
  opciones,
  handleDropdownSelectionChange,
}: {
  selectedValue: string;
  selectedKeys: Set<string>;
  opciones: { name: string; key: string }[];
  handleDropdownSelectionChange: (keys: Set<string>) => void;
}) {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          variant="flat"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        variant="flat"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleDropdownSelectionChange}
      >
        {opciones.map((column) => (
          <DropdownItem key={column.key} className="capitalize">
            {capitalize(column.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
