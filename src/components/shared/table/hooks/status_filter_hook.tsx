import { useState } from "react";
import { Selection } from "@nextui-org/react";

export default function statusFilterHook() {
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  return { statusFilter, setStatusFilter };
}
