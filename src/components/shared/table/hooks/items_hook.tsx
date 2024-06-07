import { Member } from "@/interfaces/Member";
import { useMemo } from "react";


export default function itemsHook(
    page: number,
    rowsPerPage: number,
    filteredItems: Member[]
) {
    return useMemo(() => {
        try {
          const start = (page - 1) * rowsPerPage;
          const end = start + rowsPerPage;
    
          return filteredItems!.slice(start, end);
        } catch (e) {
          console.log(e);
        }
      }, [page, filteredItems, rowsPerPage]);
      
    }