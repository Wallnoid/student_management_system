import { useState } from "react";

export default function rowsPerPageHook() {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return { rowsPerPage, setRowsPerPage };
}
