"use client";

import loadingHook from "@/components/shared/table/hooks/loading_hook";
import ClubHook from "./hooks/club_hook";
import filterValueHook from "@/components/shared/table/hooks/filter_value_hook";
import selectKeysHook from "@/components/shared/table/hooks/select_keys_hook";

export default function ClubsPage() {
  const { loading, setLoading } = loadingHook();

  const { clubs, setClubs } = ClubHook(loading);

  const { filterValue, setFilterValue } = filterValueHook();

  const { selectedKeys, setSelectedKeys } = selectKeysHook();

  return (
    <div>
      <h1>Clubes</h1>
    </div>
  );
}
