import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

describe("App Component", () => {
  it("renders the HomePage component", async () => {
    const queryClient = new QueryClient();

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );

    const homePageTitle = await screen.findByText(
      /Document Management System/i
    );
    expect(homePageTitle).toBeInTheDocument();
  });
});
