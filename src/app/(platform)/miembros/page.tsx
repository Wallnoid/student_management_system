"use client";

import { columnsTable, INITIAL_VISIBLE_COLUMNS } from "./constants/constants";
import BottomContent from "./components/bottom_content";
import TopContent from "./components/top_content";
import userHook from "./hooks/member_hook";
import loadingHook from "@/components/shared/table/hooks/loading_hook";
import filterValueHook from "@/components/shared/table/hooks/filter_value_hook";
import selectKeysHook from "@/components/shared/table/hooks/select_keys_hook";
import visibleColumnsHook from "@/components/shared/table/hooks/visible_colums_hook";
import statusFilterHook from "@/components/shared/table/hooks/status_filter_hook";
import rowsPerPageHook from "@/components/shared/table/hooks/rows_per_page_hook";
import sortDescriptionHook from "@/components/shared/table/hooks/sort_descrpition_hook";
import pageHook from "@/components/shared/table/hooks/page_hook";
import headerColumnHook from "@/components/shared/table/hooks/header_column_hook";
import { filteredItemsHook } from "@/components/shared/table/hooks/filtered_items_hook";
import { itemsHook } from "@/components/shared/table/hooks/items_hook";
import { sortedItemsMemberHook } from "@/components/shared/table/hooks/sorted_items_hook";
import { renderCellMemberHook } from "@/components/shared/table/hooks/render_cell_hook";
import renderItems from "./constants/render_item_members";
import OnNextPageHook from "@/components/shared/table/hooks/on_next_page_hook";
import OnPreviousPageHook from "@/components/shared/table/hooks/on_previous_page.hook";
import OnRowPerPageChangeHook from "@/components/shared/table/hooks/on_row_per_page_change";
import OnSearchChangeHook from "@/components/shared/table/hooks/on_search_change_hook";
import OnClearHook from "@/components/shared/table/hooks/on_clear_hook";
import DefaultTable from "@/components/shared/table/table";
import { statusOptions } from "@/constants/constants";

export default function MembersPage() {
  const { loading, setLoading } = loadingHook();

  const { users, setUsers } = userHook(loading);

  const { filterValue, setFilterValue } = filterValueHook();

  const { selectedKeys, setSelectedKeys } = selectKeysHook();

  const { visibleColumns, setVisibleColumns } = visibleColumnsHook(
    INITIAL_VISIBLE_COLUMNS
  );

  const { statusFilter, setStatusFilter } = statusFilterHook();

  const { rowsPerPage, setRowsPerPage } = rowsPerPageHook();

  const { sortDescriptor, setSortDescriptor } = sortDescriptionHook();

  const { page, setPage } = pageHook();

  const headerColumns = headerColumnHook(visibleColumns, columnsTable);

  const filteredItems = filteredItemsHook(
    filterValue,
    statusFilter,
    users,
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

  const items = itemsHook(page, rowsPerPage, filteredItems);

  const sortedItems = sortedItemsMemberHook(items, sortDescriptor);

  const renderCell = renderCellMemberHook(renderItems);

  const onNextPage = OnNextPageHook(page, pages, setPage);

  const onPreviousPage = OnPreviousPageHook(page, setPage);

  const onRowsPerPageChange = OnRowPerPageChangeHook(setRowsPerPage, setPage);

  const onSearchChange = OnSearchChangeHook(setFilterValue, setPage);

  const onClear = OnClearHook(setFilterValue, setPage);

  return (
    <DefaultTable
      selectedKeys={selectedKeys}
      setSelectedKeys={setSelectedKeys}
      sortDescriptor={sortDescriptor}
      setSortDescriptor={setSortDescriptor}
      filterValue={filterValue}
      onSearchChange={onSearchChange}
      onClear={onClear}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      visibleColumns={visibleColumns}
      setVisibleColumns={setVisibleColumns}
      columnsTable={columnsTable}
      statusOptions={statusOptions}
      entities={users}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      setPage={setPage}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
      filteredItems={filteredItems}
      pages={pages}
      headerColumns={headerColumns}
      BottomContent={BottomContent}
      TopContent={TopContent}
      sortedItems={sortedItems}
      renderCell={renderCell}
    ></DefaultTable>
  );
}
