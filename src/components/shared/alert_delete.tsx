import React from "react";
import { Button } from "@nextui-org/react";

export default function AlertDelete({
  onSubmit,
  onCancel,
  visible,
}: {
  onSubmit: () => void;
  onCancel: () => void;
  visible: boolean;
}) {
  return (
    <div
      id="alert-additional-content-2"
      className={`${
        visible ? "animate-enter " : "animate-leave hidden"
      } p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50  `}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only"></span>
        <h3 className="text-lg font-medium">Estas seguro de eliminar?</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        Si eliminas no se podrá recuperar.
      </div>
      <div className="flex">
        <Button
          type="button"
          className="text-white focus:ring-4 focus:outline-none rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center "
          onClick={onSubmit}
          color="danger"
        >
          Eliminar
        </Button>
        <Button
          type="button"
          className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 "
          data-dismiss-target="#alert-additional-content-2"
          aria-label="Close"
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
