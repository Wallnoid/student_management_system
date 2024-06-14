import { useState } from "react";

export default function pageHook() {
  const [page, setPage] = useState(1);

  return { page, setPage };
}
