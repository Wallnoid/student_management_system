import { useState } from "react";
import { Selection } from "@nextui-org/react";

export default function selectKeysHook() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  return { selectedKeys, setSelectedKeys };
}
