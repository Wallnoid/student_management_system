import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BottomContent from './bottom_content';

describe('BottomContent component', () => {
    
    it('renders without crashing', () => {
        render(
            <BottomContent
                selectedKeys="all"
                filteredItems={[{}, {}, {}]}
                page={1}
                pages={3}
                setPage={() => {}}
                onPreviousPage={() => {}}
                onNextPage={() => {}}
            />
        );
    });
    

    it('displays correct selection information', () => {
        const { getByText } = render(
            <BottomContent
                selectedKeys="all"
                filteredItems={[{}, {}, {}]}
                page={1}
                pages={3}
                setPage={() => {}}
                onPreviousPage={() => {}}
                onNextPage={() => {}}
            />
        );
        const selectionInfoElement = getByText('All items selected');
        expect(selectionInfoElement).toBeInTheDocument();
    });

    it('displays correct pagination information', () => {
        const { getByLabelText } = render(
            <BottomContent
                selectedKeys="all"
                filteredItems={[{}, {}, {}]}
                page={1}
                pages={3}
                setPage={() => {}}
                onPreviousPage={() => {}}
                onNextPage={() => {}}
            />
        );
        const paginationElement = getByLabelText('pagination navigation');
        expect(paginationElement).toBeInTheDocument();
        expect(paginationElement).toHaveAttribute('data-active-page', '1');
        expect(paginationElement).toHaveAttribute('data-total', '3'); 
    });
    

    it('calls onPreviousPage when Previous button is clicked', () => {
        const handlePreviousPage = jest.fn();
        const { getByText } = render(
            <BottomContent
                selectedKeys="all"
                filteredItems={[{}, {}, {}]}
                page={2}
                pages={3}
                setPage={() => {}}
                onPreviousPage={handlePreviousPage}
                onNextPage={() => {}}
            />
        );
        const previousButton = getByText('Previous');
        fireEvent.click(previousButton);
        expect(handlePreviousPage).toHaveBeenCalled();
    });

    it('calls onNextPage when Next button is clicked', () => {
        const handleNextPage = jest.fn();
        const { getByText } = render(
            <BottomContent
                selectedKeys="all"
                filteredItems={[{}, {}, {}]}
                page={1}
                pages={3}
                setPage={() => {}}
                onPreviousPage={() => {}}
                onNextPage={handleNextPage}
            />
        );
        const nextButton = getByText('Next');
        fireEvent.click(nextButton);
        expect(handleNextPage).toHaveBeenCalled();
    });

});
