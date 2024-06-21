import { useState } from "react";

export default function BooleanHook() {
  const [boolean, setBoolean] = useState<Boolean>(true);

  return { boolean, setBoolean };
}
