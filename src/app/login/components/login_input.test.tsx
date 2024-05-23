import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginInput from './login_input';

describe('LoginInput component', () => {
    it('renders without crashing', () => {
        render(
            <LoginInput
                type="text"
                label="Username"
                isInvalid={false}
                className="custom-input"
                onChange={() => {}}
                id="username"
            />
        );
    });

    it('displays the label correctly', () => {
        const { getByText } = render(
            <LoginInput
                type="text"
                label="Username"
                isInvalid={false}
                className="custom-input"
                onChange={() => {}}
                id="username"
            />
        );
        const labelElement = getByText('Username');
        expect(labelElement).toBeInTheDocument();
    });

    it('triggers onChange event correctly', () => {
        let value = '';
        const handleChange = jest.fn((val) => {
            value = val;
        });
        const { getByLabelText } = render(
            <LoginInput
                type="text"
                label="Username"
                isInvalid={false}
                className="custom-input"
                onChange={handleChange}
                id="username"
            />
        );
        const inputElement = getByLabelText('Username');
        fireEvent.change(inputElement, { target: { value: 'testuser' } });
        expect(value).toBe('testuser');
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
