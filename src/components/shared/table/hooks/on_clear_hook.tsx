import { useCallback } from "react";

export default function OnClearHook(
  setFilterValue: React.Dispatch<React.SetStateAction<string>>,
  setPage: React.Dispatch<React.SetStateAction<number>>
) {
  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return onClear;
}
