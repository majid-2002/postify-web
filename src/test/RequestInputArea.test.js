import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RequestInputArea from "../components/RequestInputArea";

describe("RequestInputArea", () => {
  test("renders without errors", () => {
    render(<RequestInputArea />);
  });

  test("switches component item when clicked", () => {
    render(<RequestInputArea />);
    const parametersItem = screen.getByText("Parameters");
    const bodyItem = screen.getByText("Body");
    const headerItem = screen.getByText("Header");

    // Initially, Parameters component should be rendered
    expect(screen.getByTestId("parameters-component")).toBeInTheDocument();

    // Click on Body item
    fireEvent.click(bodyItem);
    expect(screen.getByTestId("body-component")).toBeInTheDocument();

    // Click on Header item
    fireEvent.click(headerItem);
    expect(screen.getByTestId("headers-component")).toBeInTheDocument();

    // Click on Parameters item again
    fireEvent.click(parametersItem);
    expect(screen.getByTestId("parameters-component")).toBeInTheDocument();
  });

  // You can write more tests to cover different scenarios and user interactions
});
