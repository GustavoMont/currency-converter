import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "./Select";

describe("Testing Select Component", () => {
  const list = ["A", "B", "C", "D"];
  it("Should render all options on click and hide on click out", async () => {
    render(<Select list={list} />);
    expect(screen.getByTestId("options-container")).toHaveStyle(
      "opacity: 0; height: 0px;"
    );
    screen.getAllByRole("option").forEach((option) => {
      expect(option).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("listbox"));
    expect(screen.getByTestId("options-container")).toHaveStyle(
      "opacity: 1; height: fit-content;"
    );
    fireEvent.click(document.body);
    expect(screen.getByTestId("options-container")).toHaveStyle(
      "opacity: 0; height: 0px;"
    );
  });

  it("Should change option and call onSelect function", () => {
    const onSelect = jest.fn();
    render(<Select list={list} onSelect={onSelect} />);
    const firstOption = screen.getByText(list[0]);
    expect(firstOption).toBeVisible();
    const select = screen.getByTestId("select");
    const secondOption = screen.getByText(list[1]);
    expect(secondOption).not.toBeVisible();
    fireEvent.click(select);
    fireEvent.click(secondOption);
    expect(onSelect).toBeCalledTimes(1);
    expect(screen.getByText(list[0])).not.toBeVisible();
    expect(screen.getByText(list[1])).toBeVisible();
  });

  it("Should render remove active option from option container", () => {
    render(<Select list={list} />);
    fireEvent.click(screen.getByTestId("select"));
    expect(screen.getAllByRole("option")[0]).toHaveTextContent(list[1]);
    fireEvent.click(screen.getByText(list[1]));
    screen.getAllByRole("option").forEach((option) => {
      expect(option).not.toHaveTextContent(list[1]);
    });
  });
});
