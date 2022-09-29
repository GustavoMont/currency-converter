import React, { useEffect, useState } from "react";
import Container from "./Components/styles/Container";
import CurrencyBox from "./Components/styles/CurrencyBox";
import Select from "./Components/common/Select";
import Spinner from "./Components/common/Spinner";
import options from "./Components/data/currenciesOptions";

export default function App() {
  const [resultado, setResultado] = useState();
  const [baseCurrency, setBaseCurrency] = useState({
    value: "USD",
    text: "Dólar Americano",
  });
  const [finalCurrency, setFinalCurrency] = useState({
    value: "BRL",
    text: "Real Brasileiro",
  });

  function currencyFormatter(value, currency) {
    const valueNumber = parseFloat(value);
    const userLang = navigator.language;
    const localeOptions = {
      style: "currency",
      currency: currency,
    };
    return parseFloat(valueNumber.toFixed(2)).toLocaleString(
      userLang,
      localeOptions
    );
  }

  useEffect(() => {
    if (baseCurrency.value === finalCurrency.value) {
      return;
    }
    async function fetchEconomiaApi() {
      setResultado();
      const [converterResponse] = await fetch(
        `https://economia.awesomeapi.com.br/json/${baseCurrency.value}-${finalCurrency.value}`
      ).then((respostaApi) => respostaApi.json());
      setResultado(converterResponse.bid);
    }
    fetchEconomiaApi();
  }, [baseCurrency, finalCurrency]);

  return (
    <main>
      <Container>
        <CurrencyBox>
          <span className="symb">{baseCurrency.value}</span>
          <div>{currencyFormatter("1", baseCurrency.value)}</div>
          <hr />
          <div className="nome-moeda">{baseCurrency.text} </div>
        </CurrencyBox>
        <CurrencyBox className="Resultado" isFinalCurrency>
          <span className="symb">{finalCurrency.value}</span>
          <div>
            {!resultado ? (
              <Spinner />
            ) : (
              currencyFormatter(resultado, finalCurrency.value)
            )}
          </div>
          <hr />
          <div className="nome-moeda">{finalCurrency.text} </div>
        </CurrencyBox>
      </Container>
      <Container>
        <Select
          list={Object.keys(options)}
          activeOption={baseCurrency.text}
          onSelect={(item) => {
            if (item === finalCurrency.text) {
              setFinalCurrency(baseCurrency);
            }
            setBaseCurrency({ text: item, value: options[item] });
          }}
        />
        <Select
          isFinalCurrency={true}
          list={Object.keys(options)}
          firstElement={Object.keys(options)[1]}
          activeOption={finalCurrency.text}
          onSelect={(item) => {
            if (item === baseCurrency.text) {
              setBaseCurrency(finalCurrency);
            }
            setFinalCurrency({ text: item, value: options[item] });
          }}
        />
      </Container>
    </main>
  );
}
