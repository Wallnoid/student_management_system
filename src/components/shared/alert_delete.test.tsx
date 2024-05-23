import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlertDelete from './alert_delete';
import userEvent from "@testing-library/user-event";

describe('AlertDelete Component', () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        render(<AlertDelete onSubmit={mockOnSubmit} onCancel={mockOnCancel} visible={true} />);
    });

    test('calls onSubmit when Eliminar button is clicked', async () => {
        userEvent.click(screen.getByText('Eliminar'));
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        });
    });

    test('calls onCancel when Cancelar button is clicked', async () => {
        userEvent.click(screen.getByText('Cancelar'));
        await waitFor(() => {
            expect(mockOnCancel).toHaveBeenCalled();
        });
    });

    test('renders the alert with the correct text', () => {
        const alertElement = screen.getByRole('alert');
        expect(alertElement).toHaveTextContent('Estas seguro de eliminar?');
    });
});