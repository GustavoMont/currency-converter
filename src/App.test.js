const { render, screen, fireEvent } = require("@testing-library/react");
const { act } = require("react-dom/test-utils");
const { default: App } = require("./App");
const { default: options } = require("./data/currenciesOptions");

describe("Testing App", () => {
  const optionsKeys = Object.keys(options);
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("Should render correct value", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ bid: "5" }]),
    });

    render(<App />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(await screen.findByText("R$5.00")).toBeInTheDocument();
  });
  it("Should switch select values", async () => {
    render(<App />);
    const [select1, select2] = screen.getAllByTestId("select");
    expect(select1).toHaveTextContent(optionsKeys[0]);
    expect(select2).toHaveTextContent(optionsKeys[1]);
    async function selectOption() {
      await fireEvent.click(select1);
      await fireEvent.click(screen.getAllByText(optionsKeys[1])[0]);
    }
    await act(async () => {
      selectOption();
    });
    expect(select1).toHaveTextContent(optionsKeys[0]);
    expect(select2).toHaveTextContent(optionsKeys[1]);
  });
  it("Should render error message", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue();
    render(<App />);
    const [select1, select2] = screen.getAllByTestId("select");
    async function chooseBadOptions() {
      await fireEvent.click(select1);
      await fireEvent.click(screen.getAllByText(optionsKeys[4])[0]);
      await fireEvent.click(select2);
      await fireEvent.click(screen.getAllByText(optionsKeys[5])[1]);
    }
    await act(async () => {
      chooseBadOptions();
    });
    expect(screen.getByText(/Não Disponível/i)).toBeInTheDocument();
  });
});
