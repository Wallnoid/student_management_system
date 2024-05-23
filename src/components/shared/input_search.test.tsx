import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputSearch from "./input_search";

// Definición de elementos React para el autocompletado
const items = [
    { id: "dog", nombre: "Dog", presidente: { nombre: "John", apellido: "Doe" } },
    { id: "cat", nombre: "Cat", presidente: { nombre: "Jane", apellido: "Doe" } },
    { id: "bird", nombre: "Bird", presidente: { nombre: "Alice", apellido: "Smith" } }
];

describe("InputSearch Component", () => {
    test("renders InputSearch component", () => {
        render(<InputSearch datas={items} name="" value="" onChange={() => {}} />);
        expect(screen.getByLabelText("Club asignado")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Buscar Club")).toBeInTheDocument();
    });

    test("displays autocomplete items when typing", async () => {
        render(<InputSearch datas={items} name="" value="" onChange={() => {}} />);
        const input = screen.getByPlaceholderText("Buscar Club");
        userEvent.type(input, "Dog");
        await waitFor(() => {
            expect(screen.getByText("Dog")).toBeInTheDocument();
        });
    });
});