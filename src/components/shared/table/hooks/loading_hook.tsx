import { useState } from "react";

export default function loadingHook() {
  const [loading, setLoading] = useState(true);
  return { loading, setLoading };
}
