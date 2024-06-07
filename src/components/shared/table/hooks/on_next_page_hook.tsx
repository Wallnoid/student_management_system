import { useCallback } from "react";

export default function OnNextPageHook(
  page: number,
  pages: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) {
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  return onNextPage;
}
