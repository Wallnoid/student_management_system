import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ModalMembers from "./modal_members";
import { ClubInternos } from "@/interfaces/ClubInternos";

describe("ModalMembers Component", () => {
  const club: ClubInternos = {
    id: "2c140b7f-aecd-40e1-b74d-ed44a28aa897",
    nombre: "Este es el bueno",
    presidente: "bec2a8ef-5e50-4606-a43c-7d181f976676",
    estado: "Activo",
    descripcion: "adasdsrf",
    ubicacion: "activo"
  };

  test("renders component and opens modal on icon click", async () => {
    render(<ModalMembers club={club} />);

    // Verifica que el ícono de agregar miembros esté presente en el DOM
    const icon = screen.getByTestId("add-members-icon");
    expect(icon).toBeInTheDocument();

    // Haz clic en el ícono para abrir el modal
    fireEvent.click(icon);

    // Espera a que el modal se abra completamente y verifique el título
    await waitFor(() => {
      const modalTitle = screen.getByText(club.nombre);
      expect(modalTitle).toBeInTheDocument();
    });

    // Puedes agregar más pruebas aquí para verificar la funcionalidad de agregar y eliminar miembros

    // Por ejemplo:
    // Simular agregar un miembro y verificar que se actualice correctamente en el modal

    // fireEvent.click(...);
    // await waitFor(() => {
    //   expect(screen.getByText("Nuevo Miembro")).toBeInTheDocument();
    // });
  });
});
