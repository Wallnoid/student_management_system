import React from 'react';
import { render } from '@testing-library/react';
import LoginSubmit from './login_submit';

describe('LoginSubmit component', () => {
    it('renders without crashing', () => {
        render(
            <LoginSubmit
                label="Submit"
                color="primary"
                variant="flat"
                isLoading={false}
            />
        );
    });

    it('displays the correct label', () => {
        const { getByText } = render(
            <LoginSubmit
                label="Submit"
                color="primary"
                variant="flat"
                isLoading={false}
            />
        );
        const buttonElement = getByText('Submit');
        expect(buttonElement).toBeInTheDocument();
    });

    it('sets isLoading prop correctly', () => {
        const { getByText } = render(
            <LoginSubmit
                label="Submit"
                color="primary"
                variant="flat"
                isLoading={true}
            />
        );
        const buttonElement = getByText('Submit');
        expect(buttonElement).toHaveAttribute('disabled');
    });
});