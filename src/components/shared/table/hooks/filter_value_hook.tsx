import { useState } from "react";

export default function filterValueHook() {
  const [filterValue, setFilterValue] = useState("");
  return { filterValue, setFilterValue };
}
