import { useCallback } from "react";

export default function OnPreviousPageHook(
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) {
  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  return onPreviousPage;
}
