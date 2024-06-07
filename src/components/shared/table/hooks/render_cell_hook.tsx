import { renderCellType } from "@/app/types/types";
import { Member } from "@/interfaces/Member";
import { ReactNode, useCallback } from "react";

export default function renderCellHook(
  renderItems: (user: Member, cellValue: any) => renderCellType[]
): (user: Member, columnKey: React.Key) => ReactNode {
  return useCallback((user: Member, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Member];

    const renderCellValues = renderItems(user, cellValue);

    const renderCell = renderCellValues.find((cell) => cell.key === columnKey);
    return renderCell ? renderCell.reactHelement : cellValue;
  }, []);
}
