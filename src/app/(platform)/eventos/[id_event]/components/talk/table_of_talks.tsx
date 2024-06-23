"use client";

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
import { sortedItemsClubesHook } from "@/components/shared/table/hooks/sorted_items_hook";
import { renderCellTalksHook } from "@/components/shared/table/hooks/render_cell_hook";
import OnNextPageHook from "@/components/shared/table/hooks/on_next_page_hook";
import OnPreviousPageHook from "@/components/shared/table/hooks/on_previous_page.hook";
import OnRowPerPageChangeHook from "@/components/shared/table/hooks/on_row_per_page_change";
import OnSearchChangeHook from "@/components/shared/table/hooks/on_search_change_hook";
import OnClearHook from "@/components/shared/table/hooks/on_clear_hook";
import DefaultTable from "@/components/shared/table/table";

import TalksHook from "../../hooks/talks_hook";
import {
  columnsTableTalks,
  EventsStatusOptions,
  INITIAL_VISIBLE_COLUMNS_TALKS,
} from "../../constants/constants";
import renderItems from "../../constants/render_items_talks";
import BottomContent from "../../../components/bottom_content";
import topContent from "./top_content_talks";
import { useRouter } from "next/navigation";
export default function TalksTable({ id }: { id: string }) {
  const router = useRouter();

  const { loading, setLoading } = loadingHook();

  const { talks, setTalks } = TalksHook(id, loading);

  const { filterValue, setFilterValue } = filterValueHook();

  const { selectedKeys, setSelectedKeys } = selectKeysHook();

  const { visibleColumns, setVisibleColumns } = visibleColumnsHook(
    INITIAL_VISIBLE_COLUMNS_TALKS
  );

  const { statusFilter, setStatusFilter } = statusFilterHook();

  const { rowsPerPage, setRowsPerPage } = rowsPerPageHook();

  const { sortDescriptor, setSortDescriptor } = sortDescriptionHook();

  const { page, setPage } = pageHook();

  const headerColumns = headerColumnHook(visibleColumns, columnsTableTalks);

  const filteredItems = filteredItemsHook(
    filterValue,
    statusFilter,
    talks,
    EventsStatusOptions
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

  const sortedItems = sortedItemsClubesHook(items, sortDescriptor);

  const renderCell = renderCellTalksHook(id, router, renderItems);

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
      columnsTable={columnsTableTalks}
      statusOptions={EventsStatusOptions}
      entities={talks}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      setPage={setPage}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
      filteredItems={filteredItems}
      pages={pages}
      headerColumns={headerColumns}
      BottomContent={BottomContent}
      TopContent={topContent}
      sortedItems={sortedItems}
      renderCell={renderCell}
    ></DefaultTable>
  );
}
