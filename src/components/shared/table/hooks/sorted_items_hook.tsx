import { Member } from "@/interfaces/Member";
import { SortDescriptor } from "@nextui-org/react";
import { useMemo } from "react";

export default function sortedItemsHook(
  items: Member[] | undefined,
  sortDescriptor: SortDescriptor
) {
  return useMemo(() => {
    try {
      return [...items!].sort((a: Member, b: Member) => {
        const first = a[sortDescriptor.column as keyof Member] as string;
        const second = b[sortDescriptor.column as keyof Member] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.log(e);
    }
  }, [sortDescriptor, items]);
}
