import { renderCellType } from "@/app/types/types";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactNode, useCallback } from "react";

export function renderCellMemberHook(
  renderItems: (user: Member, cellValue: any) => renderCellType[]
): (user: Member, columnKey: React.Key) => ReactNode {
  return useCallback((user: Member, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Member];

    const renderCellValues = renderItems(user, cellValue);

    const renderCell = renderCellValues.find((cell) => cell.key === columnKey);
    return renderCell ? renderCell.reactHelement : cellValue;
  }, []);
}

export function renderCellProjectHook(
  router: AppRouterInstance,
  renderItems: (
    project: Proyecto,
    cellValue: any,
    router: AppRouterInstance
  ) => renderCellType[]
): (project: Proyecto, columnKey: React.Key) => any {
  return useCallback((project: Proyecto, columnKey: React.Key) => {
    const cellValue = project[columnKey as keyof Proyecto];

    const renderCellValues = renderItems(project, cellValue, router);

    const renderCell = renderCellValues.find((cell) => cell.key === columnKey);
    return renderCell ? renderCell.reactHelement : cellValue;
  }, []);
}
