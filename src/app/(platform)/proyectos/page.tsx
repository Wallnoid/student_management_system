"use client";

import { ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import BottomContent from "./components/bottom_content";
import TopContent from "./components/top_content";
import { useRouter } from "next/navigation";
import {
  columnsTable,
  INITIAL_VISIBLE_COLUMNS,
  statusOptions,
} from "./constants/constants";
import ProjectHook from "./hooks/project_hook";
import filterValueHook from "@/components/shared/table/hooks/filter_value_hook";
import selectKeysHook from "@/components/shared/table/hooks/select_keys_hook";
import visibleColumnsHook from "@/components/shared/table/hooks/visible_colums_hook";
import statusFilterHook from "@/components/shared/table/hooks/status_filter_hook";
import rowsPerPageHook from "@/components/shared/table/hooks/rows_per_page_hook";
import sortDescriptionHook from "@/components/shared/table/hooks/sort_descrpition_hook";

import pageHook from "@/components/shared/table/hooks/page_hook";
import headerColumnHook from "@/components/shared/table/hooks/header_column_hook";
import { filteredItemsProjectHook } from "@/components/shared/table/hooks/filtered_items_hook";
import { itemsProjectHook } from "@/components/shared/table/hooks/items_hook";
import { sortedItemsProjectHook } from "@/components/shared/table/hooks/sorted_items_hook";
import { renderCellProjectHook } from "@/components/shared/table/hooks/render_cell_hook";
import renderItems from "./constants/render_items_project";
import OnNextPageHook from "@/components/shared/table/hooks/on_next_page_hook";
import OnPreviousPageHook from "@/components/shared/table/hooks/on_previous_page.hook";
import OnRowPerPageChangeHook from "@/components/shared/table/hooks/on_row_per_page_change";
import OnSearchChangeHook from "@/components/shared/table/hooks/on_search_change_hook";
import OnClearHook from "@/components/shared/table/hooks/on_clear_hook";

export default function ProjectsPage() {
  const { projects, setProjects } = ProjectHook(true);

  const router = useRouter();

  const { filterValue, setFilterValue } = filterValueHook();

  const { selectedKeys, setSelectedKeys } = selectKeysHook();

  const { visibleColumns, setVisibleColumns } = visibleColumnsHook(
    INITIAL_VISIBLE_COLUMNS
  );

  const { statusFilter, setStatusFilter } = statusFilterHook();

  const { rowsPerPage, setRowsPerPage } = rowsPerPageHook();

  const { sortDescriptor, setSortDescriptor } = sortDescriptionHook();

  const { page, setPage } = pageHook();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = headerColumnHook(visibleColumns, columnsTable);

  const filteredItems = filteredItemsProjectHook(
    filterValue,
    statusFilter,
    projects,
    statusOptions
  );

  const filteredItemsLength = function () {
    try {
      return filteredItems!.length;
    } catch (e) {
      return 0;
    }
  };

  const pages = Math.ceil(filteredItemsLength() / rowsPerPage);

  const items = itemsProjectHook(page, rowsPerPage, filteredItems);

  const sortedItems = sortedItemsProjectHook(items, sortDescriptor);

  const renderCell = renderCellProjectHook(router, renderItems);

  const onNextPage = OnNextPageHook(page, pages, setPage);

  const onPreviousPage = OnPreviousPageHook(page, setPage);

  const onRowsPerPageChange = OnRowPerPageChangeHook(setRowsPerPage, setPage);

  const onSearchChange = OnSearchChangeHook(setFilterValue, setPage);

  const onClear = OnClearHook(setFilterValue, setPage);

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
          columns={columnsTable}
          statusOptions={statusOptions}
          users={projects}
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
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
