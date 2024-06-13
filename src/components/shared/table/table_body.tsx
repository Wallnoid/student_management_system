import { Entities } from "@/types/types";
import { TableBody, TableCell, TableRow } from "@nextui-org/react";

export default function DefaultTableBody({
  renderCell,
  sortedItems,
}: {
  renderCell: any;
  sortedItems: Entities[];
}) {
  return (
    <TableBody emptyContent={"Cargando..."} items={sortedItems}>
      {(item) => (
        <TableRow key={item.id}>
          {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
  );
}
