import React from 'react';
import { render } from '@testing-library/react';
import { VerticalDotsIcon, ChevronDownIcon, SearchIcon, PlusIcon, EditIcon, DeleteIcon, EyeIcon, UsersICon, MemberIcon, ProjectIcon } from './icons';

describe('Icon Components', () => {
    test('renders VerticalDotsIcon', () => {
        render(<VerticalDotsIcon />);
    });

    test('renders ChevronDownIcon', () => {
        render(<ChevronDownIcon />);
    });

    test('renders SearchIcon', () => {
        render(<SearchIcon />);
    });

    test('renders PlusIcon', () => {
        render(<PlusIcon />);
    });

    test('renders EditIcon', () => {
        render(<EditIcon />);
    });

    test('renders DeleteIcon', () => {
        render(<DeleteIcon />);
    });

    test('renders EyeIcon', () => {
        render(<EyeIcon />);
    });

    test('renders UsersIcon', () => {
        render(<UsersICon />);
    });

    test('renders MemberIcon', () => {
        render(<MemberIcon />);
    });

    test('renders ProjectIcon', () => {
        render(<ProjectIcon />);
    });
});
