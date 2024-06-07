import { useCallback } from "react";

export default function OnRowPerPageChangeHook(
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
  setPage: React.Dispatch<React.SetStateAction<number>>
) {
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  return onRowsPerPageChange;
}
