"use client";

import React, { ReactNode, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User as Proyect,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";

import { getProyectos } from "@/services/proyectos.service";

import {
  DeleteIcon,
  EyeIcon,
  EditIcon,
  ProjectIcon,
  PlusIcon,
} from "../../../components/shared/icons";

import { columns, statusOptions, INITIAL_VISIBLE_COLUMNS } from "./data/data";
import BottomContent from "./components/bottom_content";
import TopContent from "./components/top_content";
import { Proyecto } from "@/interfaces/Proyecto";
import { ClubInternos } from "@/interfaces/ClubInternos";
import FormModal from "./components/form_modal";

import AddTaskModal from "./components/add_tasks_modal";
import InfoProyect from "./components/info_proyect";

const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "primary",
  completado: "success",
  suspendido: "danger",
};

type Proyect = Proyecto;

export default function ProyectsPage() {
  const [proyects, setProyects] = useState<Proyect[]>([]);

  useEffect(() => {
    getProyectos()
      .then((data) => {
        setProyects(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    try {
      let filteredUsers = [...proyects];

      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
          user.nombre.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== statusOptions.length
      ) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.estado)
        );
      }

      return filteredUsers;
    } catch (e) {
      console.log(e);
    }
  }, [proyects, filterValue, statusFilter]);

  const filteredItemsLength = function () {
    try {
      return filteredItems!.length;
    } catch (e) {
      return 0;
    }
  };

  const pages = Math.ceil(filteredItemsLength() / rowsPerPage);

  const items = React.useMemo(() => {
    try {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems!.slice(start, end);
    } catch (e) {
      console.log(e);
    }
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    try {
      return [...items!].sort((a: Proyect, b: Proyect) => {
        const first = a[sortDescriptor.column as keyof Proyect] as string;
        const second = b[sortDescriptor.column as keyof Proyect] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.log(e);
    }
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (proyect: Proyect, columnKey: React.Key) => {
      const cellValue = proyect[columnKey as keyof Proyect];

      switch (columnKey) {
        case "nombre":
          return (
            <Proyect
              avatarProps={{
                radius: "lg",
                showFallback: true,
                src: "https://images.unsplash.com/broken",
                fallback: <ProjectIcon />,
              }}
              //description={proyect.responsable.nombre}
              name={cellValue as string}
            >
              {/*{proyect.responsable.nombre}*/}
            </Proyect>
          );
        case "responsable":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {(cellValue as ClubInternos).nombre as string}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {(proyect.responsable as ClubInternos).presidente.nombre +
                  " " +
                  (proyect.responsable as ClubInternos).presidente.apellido}
              </p>
            </div>
          );
        case "estado":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[proyect.estado]}
              size="sm"
              variant="flat"
            >
              {cellValue as string}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <InfoProyect proyect={proyect}></InfoProyect>

              <FormModal
                proyect={proyect as Proyect}
                icon={<EditIcon />}
              ></FormModal>
              

              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
              <AddTaskModal proyect={proyect as Proyect} icon={<PlusIcon />} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <Table
      className="p-10"
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={
        <BottomContent
          selectedKeys={selectedKeys}
          filteredItems={filteredItems}
          page={page}
          pages={pages}
          setPage={setPage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        ></BottomContent>
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px] ",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          filterValue={filterValue}
          onClear={onClear}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          columns={columns}
          statusOptions={statusOptions}
          users={proyects}
          onRowsPerPageChange={onRowsPerPageChange}
        ></TopContent>
      }
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Cargando..."} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey) as ReactNode}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
