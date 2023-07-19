import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Chart from "./Chart";


jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        prices: [
          [1627664400000, 30000.0],
          [1627750800000, 31000.0],
          [1627837200000, 32000.0],
         
        ],
      },
    })
  ),
}));

describe("Chart Component", () => {
  it("renders the chart with default options", async () => {
    render(<Chart />);

    
    await waitFor(() => {
      expect(screen.queryByText("Loading chart...")).toBeNull();
    });

    
    expect(screen.getByTestId("apexchart")).toBeInTheDocument();
  });

  it("updates the chart when changing currency", async () => {
    render(<Chart />);

    await waitFor(() => {
      expect(screen.queryByText("Loading chart...")).toBeNull();
    });

   
    const currencySelect = screen.getByLabelText("Currency:");
    fireEvent.change(currencySelect, { target: { value: "eur" } });

    
    await waitFor(() => {
      expect(screen.getByTestId("apexchart")).toBeInTheDocument();
    });
  });

  it("updates the chart when changing crypto", async () => {
    render(<Chart />);

    await waitFor(() => {
      expect(screen.queryByText("Loading chart...")).toBeNull();
    });

    
    const cryptoSelect = screen.getByLabelText("Crypto:");
    fireEvent.change(cryptoSelect, { target: { value: "ethereum" } });

  
    await waitFor(() => {
      expect(screen.getByTestId("apexchart")).toBeInTheDocument();
    });
  });

  it("updates the chart when changing chart type", async () => {
    render(<Chart />);

    await waitFor(() => {
      expect(screen.queryByText("Loading chart...")).toBeNull();
    });

   
    const chartTypeSelect = screen.getByLabelText("Chart Type:");
    fireEvent.change(chartTypeSelect, { target: { value: "area" } });

  
    await waitFor(() => {
      expect(screen.getByTestId("apexchart")).toBeInTheDocument();
    });
  });
});
