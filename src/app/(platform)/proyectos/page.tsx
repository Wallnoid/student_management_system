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
  User as Project,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  Link,
} from "@nextui-org/react";

import {
  actualizarEstadoProyecto,
  getProyectos,
} from "@/services/proyectos.service";

import {
  DeleteIcon,
  EyeIcon,
  EditIcon,
  ProjectIcon,
  PlusIcon,
  TaskIcon,
} from "../../../components/shared/icons";

import { columns, statusOptions, INITIAL_VISIBLE_COLUMNS } from "./data/data";
import BottomContent from "./components/bottom_content";
import TopContent from "./components/top_content";
import { Proyecto } from "@/interfaces/Proyecto";
import { ClubInternos } from "@/interfaces/ClubInternos";
import FormModal from "./components/form_modal";

import AddTaskModal from "./components/add_tasks_modal";
import InfoProject from "./components/info_proyect";
import toast from "react-hot-toast";
import AlertDelete from "@/components/shared/alert_delete";
import { cutString, formatDate } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { MdChecklistRtl } from "react-icons/md";
import { Member } from "@/interfaces/Member";

const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "primary",
  completado: "success",
  suspendido: "danger",
};

type Project = Proyecto;

export default function ProyectsPage() {
  const [proyects, setProyects] = useState<Project[]>([]);

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

  const deleteUser = async (id: string) => {
    toast.custom(
      (t) => (
        <AlertDelete
          onCancel={() => {
            toast.dismiss(t.id);
          }}
          onSubmit={() => {
            toast.promise(actualizarEstadoProyecto(id, "eliminado"), {
              loading: "Saving...",
              success: () => {
                window.location.reload();

                return <b>Proyecto Eliminado!</b>;
              },
              error: (err) => {
                return `${err.message.toString()}`;
              },
            });

            toast.dismiss(t.id);
          }}
          visible={t.visible}
        ></AlertDelete>
      ),
      { duration: Infinity }
    );
  };
  const router = useRouter();
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
      return [...items!].sort((a: Project, b: Project) => {
        const first = a[sortDescriptor.column as keyof Project] as string;
        const second = b[sortDescriptor.column as keyof Project] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.log(e);
    }
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (project: Project, columnKey: React.Key) => {
      const cellValue = project[columnKey as keyof Project];

      switch (columnKey) {
        case "nombre":
          return (
            <Project
              avatarProps={{
                radius: "lg",
                showFallback: true,
                src: "https://images.unsplash.com/broken",
                fallback: <ProjectIcon />,
              }}
              //description={proyect.responsable.nombre}
              name={cutString(cellValue as string, 20)}
            ></Project>
          );
        case "responsable":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {cutString((cellValue as ClubInternos).nombre, 15) as string}
              </p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {cutString(
                  ((project.responsable as ClubInternos).presidente as Member).nombre +
                    " " +
                  ((project.responsable as ClubInternos).presidente as Member).apellido,
                  20  
                )}
              </p>
            </div>
          );
        case "estado":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[project.estado]}
              size="sm"
              variant="flat"
            >
              {cellValue as string}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <InfoProject proyect={project}></InfoProject>

              <FormModal
                proyect={project as Project}
                icon={<EditIcon />}
              ></FormModal>

              <Tooltip color="danger" content="Eliminar Proyecto">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteUser(project!.id ?? "")}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
              <Tooltip content="Agregar Tareas">
                <span
                  className="text-lg cursor-pointer active:opacity-50"
                  onClick={() => goToTasks(project!.id ?? "")}
                >
                <MdChecklistRtl color="grey" />
                </span>
              </Tooltip>
            </div>
          );
        case "fecha_inicio":
          return formatDate(cellValue as string);

        case "fecha_fin":
          return formatDate(cellValue as string);

        default:
          return cellValue;
      }
    },
    []
  );

  const goToTasks = async (id: string) => {
    router.push(`/tareas/${id}`);
    
  }


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
