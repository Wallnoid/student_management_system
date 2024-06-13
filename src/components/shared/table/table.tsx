import { columnsTableType } from "@/types/types";
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumnProps,
} from "@nextui-org/react";

export default function DefaultTable({
  selectedKeys,
  setSelectedKeys,
  sortDescriptor,
  setSortDescriptor,
  filterValue,
  onSearchChange,
  onClear,
  statusFilter,
  setStatusFilter,
  visibleColumns,
  setVisibleColumns,
  columnsTable,
  statusOptions,
  entities,
  onRowsPerPageChange,
  page,
  setPage,
  onPreviousPage,
  onNextPage,
  filteredItems,
  pages,
  headerColumns,
  BottomContent,
  TopContent,
  sortedItems,
  renderCell,
}: {
  selectedKeys: any;
  setSelectedKeys: any;
  sortDescriptor: any;
  setSortDescriptor: any;
  filterValue: any;
  onSearchChange: any;
  onClear: any;
  statusFilter: any;
  setStatusFilter: any;
  visibleColumns: any;
  setVisibleColumns: any;
  columnsTable: any;
  statusOptions: any;
  entities: any;
  onRowsPerPageChange: any;
  page: any;
  setPage: any;
  onPreviousPage: any;
  onNextPage: any;
  filteredItems: any;
  pages: any;
  headerColumns: columnsTableType[];

  BottomContent: any;
  TopContent: any;
  sortedItems: any[];
  renderCell: any;
}) {
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
          users={entities}
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
