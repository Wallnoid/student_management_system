const columns = [
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "CLUB", uid: "responsable", sortable: true },
  { name: "FECHA INICIO", uid: "fecha_inicio", sortable: true },
  { name: "FECHA FIN", uid: "fecha_fin", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Completado", uid: "completado" },
  { name: "Suspendido", uid: "suspendido" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "responsable",
  "fecha_inicio",
  "fecha_fin",
  "estado",
  "actions",
];

export { columns, statusOptions, INITIAL_VISIBLE_COLUMNS };
