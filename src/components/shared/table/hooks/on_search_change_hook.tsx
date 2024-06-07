import { useCallback } from "react";

export default function OnSearchChangeHook(
  setFilterValue: React.Dispatch<React.SetStateAction<string>>,
  setPage: React.Dispatch<React.SetStateAction<number>>
) {
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  return onSearchChange;
}
