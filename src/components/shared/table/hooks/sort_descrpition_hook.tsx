import { SortDescriptor } from "@nextui-org/react";
import { useState } from "react";

export default function sortDescriptionHook() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  return { sortDescriptor, setSortDescriptor };
}
