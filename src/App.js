import React, { useEffect, useState } from "react";
import Container from "./Components/styles/Container";
import CurrencyBox from "./Components/styles/CurrencyBox";
import Select from "./Components/common/Select";

export default function App() {
  // Mostra os resultados da Consulta ================
  const [resultado, setResultado] = useState("...");
  // São as opções disponíveis ==============================
  const optionMB = {
    "Dólar Americano": "USD",
    "Real Brasileiro": "BRL",
    Euro: "EUR",
    "Libra Esterlina": "GBP",
    Iene: "JPY",
    "Dólar Australiano": "AUD",
    "Dólar Canadense": "CAD",
  };
  // const optionMF = {
  //   "Real Brasileiro": "BRL",
  //   "Dólar Americano": "USD",
  //   Euro: "EUR",
  //   "Libra Esterlina": "GBP",
  //   Iene: "JPY",
  //   "Dólar Australiano": "AUD",
  //   "Dólar Canadense": "CAD",
  // };
  // Variáveis que serão usadas para consumir a API =====================================
  const [baseCurrency, setBaseCurrency] = useState({
    value: "USD",
    text: "Dólar Americano",
  });
  const [finalCurrency, setFinalCurrency] = useState({
    value: "BRL",
    text: "Real Brasileiro",
  });

  // Faz a consulta na API ==============================
  useEffect(() => {
    if (baseCurrency.value === finalCurrency.value) {
      return;
    }
    const userLang = navigator.language;
    setResultado("...");
    const currencySymb = { style: "currency", currency: finalCurrency }; // Estilo da Formatação
    // fetch(`https://economia.awesomeapi.com.br/json/${baseCurrency}-${finalCurrency}`)
    //   .then((respostaApi) => respostaApi.json())
    //   .then((resposta) => parseFloat(resposta[0].high))
    //   .catch(() => `Não Cosegui :(`)
    //   .then((currency) => currency.toLocaleString(userLang, currencySymb))
    //   .then((formatedCurrency) => setResultado(formatedCurrency));
  }, [baseCurrency, finalCurrency]);

  const selectMB = document.querySelector(".moeda-base");
  const selectMF = document.querySelector(".moeda-final");

  return (
    <main>
      <Container>
        <CurrencyBox>
          <span className="symb">{baseCurrency.value}</span>
          <div>
            {(1.0).toLocaleString(navigator.language, {
              style: "currency",
              currency: baseCurrency.value,
            })}
          </div>
          <hr />
          <div className="nome-moeda">{baseCurrency.text} </div>
        </CurrencyBox>
        <CurrencyBox className="Resultado" isFinalCurrency>
          <span className="symb">{finalCurrency.value}</span>
          <div>{resultado}</div>
          <hr />
          <div className="nome-moeda">{finalCurrency.text} </div>
        </CurrencyBox>
      </Container>
      <Container>
        <Select
          list={Object.keys(optionMB)}
          activeOption={baseCurrency.text}
          onSelect={(item) => {
            if (item === finalCurrency.text) {
              setFinalCurrency(baseCurrency);
            }
            setBaseCurrency({ text: item, value: optionMB[item] });
          }}
        />
        <Select
          isFinalCurrency={true}
          list={Object.keys(optionMB)}
          firstElement={Object.keys(optionMB)[1]}
          activeOption={finalCurrency.text}
          onSelect={(item) => {
            if (item === baseCurrency.text) {
              setBaseCurrency(finalCurrency);
            }
            setFinalCurrency({ text: item, value: optionMB[item] });
          }}
        />
      </Container>
    </main>
  );
}
