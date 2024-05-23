import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/'; // Importante para extender las expectativas de jest-dom
import DefaultSelect from './select';

describe('DefaultSelect Component', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    const testData = {
        software: 'Software Engineering',
        telecomunicaciones: 'Telecommunications',
        ti: 'Information Technology',
        ingenieriaIndustrial: 'Industrial Engineering',
        automatizacionYRobotica: 'Automation and Robotics',
        '1': '1st Semester',
        '2': '2nd Semester',
        '3': '3rd Semester',
    };
    
    test('renders DefaultSelect component with error message', () => {
        render(
            <DefaultSelect
                id="test-select"
                datas={testData}
                label="Test Select"
                isInvalid={true}
                errorMessage="Invalid selection"
                name="test-select"
                value=""
                onChange={mockOnChange}
            />
        );
        expect(screen.getByText('Invalid selection')).toBeInTheDocument();
    });
});
