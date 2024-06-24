import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BottomContent from "./bottom_content";

describe("BottomContent Component", () => {
  const props = {
    selectedKeys: new Set(),
    filteredItems: Array(10).fill({}),
    page: 1,
    pages: 5,
    setPage: jest.fn(),
    onPreviousPage: jest.fn(),
    onNextPage: jest.fn()
  };

  test("renders the component", () => {
    render(<BottomContent {...props} />);
    expect(screen.getByText("0 of 10 selected")).toBeInTheDocument();
  });

  test("displays the correct number of selected items", () => {
    render(<BottomContent {...props} selectedKeys={new Set([1, 2, 3])} />);
    expect(screen.getByText("3 of 10 selected")).toBeInTheDocument();
  });

  test("calls onPreviousPage when Previous button is clicked", () => {
    render(<BottomContent {...props} />);
    fireEvent.click(screen.getByText("Previous"));
    expect(props.onPreviousPage).toHaveBeenCalled();
  });

  test("calls onNextPage when Next button is clicked", () => {
    render(<BottomContent {...props} />);
    fireEvent.click(screen.getByText("Next"));
    expect(props.onNextPage).toHaveBeenCalled();
  });

  test("disables buttons when pages is 1", () => {
    render(<BottomContent {...props} pages={1} />);
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("pagination controls work correctly", () => {
    render(<BottomContent {...props} />);
    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
    // Simula el cambio de página
    fireEvent.click(screen.getByText("2"));
    expect(props.setPage).toHaveBeenCalledWith(2);
  });
});
