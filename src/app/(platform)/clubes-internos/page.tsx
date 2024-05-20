"use client";

import React, { useEffect, useState, useMemo, useCallback, ChangeEvent } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";

import { getClubes } from "@/services/clubes.service";
import { DeleteIcon, EyeIcon, EditIcon, MemberIcon } from "@/components/shared/icons";
import { columns, statusOptions } from "./data/clubs-data";
import TopContent from "./components/top_content";
import { ClubInternos } from "@/interfaces/ClubInternos";
import BottomContent from "@/app/(platform)/miembros/components/bottom_content";
import {getMemberById} from "@/services/members.service";

const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "success",
  inactivo: "danger",
  suspendido: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["nombre", "ubicacion","presidente", "estado", "actions"];

export default function ClubesPage() {
  const [clubs, setClubs] = useState<ClubInternos[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "nombre",
    direction: "ascending",
  });
  const [page, setPage] = useState<number>(1);


  useEffect(() => {
    getClubes()
        .then((data) => {
          setClubs(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
        Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    try {
      let filteredClubs = [...clubs];

      if (hasSearchFilter) {
        filteredClubs = filteredClubs.filter((club) =>
            club.nombre.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (
          statusFilter !== "all" &&
          Array.from(statusFilter).length !== statusOptions.length
      ) {
        filteredClubs = filteredClubs.filter((club) =>
            Array.from(statusFilter).includes(club.estado)
        );
      }

      return filteredClubs;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [clubs, filterValue, statusFilter]);

  const filteredItemsLength = () => {
    try {
      return filteredItems.length;
    } catch (e) {
      return 0;
    }
  };

  const pages = Math.ceil(filteredItemsLength() / rowsPerPage);

  const items = useMemo(() => {
    try {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice(start, end);
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    try {
      return [...items].sort((a: ClubInternos, b: ClubInternos) => {
        const first = a[sortDescriptor.column as keyof ClubInternos] as string;
        const second = b[sortDescriptor.column as keyof ClubInternos] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [sortDescriptor, items]);

  const renderCell = useCallback((club: ClubInternos, columnKey: React.Key) => {
    const cellValue = club[columnKey as keyof ClubInternos];

    switch (columnKey) {
      case "nombre":
        return (
            <User
                avatarProps={{
                  radius: "lg",
                  showFallback: true,
                  src: 'https://images.unsplash.com/broken',
                  fallback: (
                      <MemberIcon className="text-primary" size="large" color="primary" />
                  ),
                }}
                description={club.ubicacion}
                name={cellValue}
            >
              {club.ubicacion}
            </User>
        );
      case "ubicacion":
        return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
        );
      case "estado":
        return (
            <Chip
                className="capitalize"
                color={statusColorMap[club.estado]}
                size="sm"
                variant="flat"
            >
              {cellValue}
            </Chip>
        );
      case "actions":
        return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
              </Tooltip>
              <Tooltip content="Edit club">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete club">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
              </Tooltip>
            </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
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
                clubs={clubs}
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
        <TableBody emptyContent={"No clubs found"} items={sortedItems}>
          {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
          )}
        </TableBody>
      </Table>
  );
}
