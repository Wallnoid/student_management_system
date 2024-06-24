import { useMemo } from "react";
import { Selection } from "@nextui-org/react";
import { columnsTableType } from "@/types/types";

export default function headerColumnHook(
  visibleColumns: Selection,
  columnsTable: columnsTableType[]
) {
  return useMemo(() => {
    if (visibleColumns === "all") return columnsTable;

    return columnsTable.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
}
