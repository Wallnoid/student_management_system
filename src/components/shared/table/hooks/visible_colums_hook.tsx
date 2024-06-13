import { useState } from "react";
import { Selection } from "@nextui-org/react";

export default function visibleColumnsHook(initial_visible_columns: string[]) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initial_visible_columns)
  );
  return { visibleColumns, setVisibleColumns };
}
