import { useState } from "react";

export default function SelectedMemberHook() {
  const [selectedMember, setSelectedMember] = useState<string>("");

  return { selectedMember, setSelectedMember };
}
