import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./Homepage";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

describe("HomePage Component", () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      documents: [
        { id: "1", name: "Contract.pdf", status: "Pending" },
        { id: "2", name: "Proposal.docx", status: "Signed" },
      ],
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders HomePage with all components", () => {
    render(<HomePage />);

    expect(screen.getByText(/document management system/i)).toBeInTheDocument();
    expect(screen.getByText(/upload document/i)).toBeInTheDocument();
    expect(screen.getByText(/request signatures/i)).toBeInTheDocument();
    expect(screen.getByText(/document status/i)).toBeInTheDocument();
  });

  it("displays documents from state", () => {
    render(<HomePage />);

    expect(screen.getByText(/contract.pdf/i)).toBeInTheDocument();
    expect(screen.getByText(/proposal.docx/i)).toBeInTheDocument();
  });

  it("handles file upload", () => {
    render(<HomePage />);

    const fileInput = screen.getByLabelText(/choose file/i);
    const file = new File(["dummy content"], "test.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText(/uploaded: test.pdf/i)).toBeInTheDocument();
  });

  it("displays loading skeleton", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      documents: [],
      loading: true,
      error: null,
    });

    render(<HomePage />);

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("displays error state", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      documents: [],
      loading: false,
      error: "Failed to fetch documents.",
    });

    render(<HomePage />);

    expect(screen.getByTestId("error-component")).toBeInTheDocument();
  });
});
