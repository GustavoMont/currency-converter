import React, { useState } from "react";
import Container from "./Components/styles/Container";
import CurrencyBox from "./Components/styles/CurrencyBox";
import Select from "./Components/common/Select";

export default function App() {
  // Mostra os resultados da Consulta ================
  const [resultado] = useState("...");
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
  const [moedaBase] = useState("USD");
  const [moedaFinal] = useState("BRL");

  // Faz a consulta na API ==============================
  // useEffect(() => {
  //   const userLang = navigator.language;
  //   setResultado("...");
  //   const currencySymb = { style: "currency", currency: moedaFinal }; // Estilo da Formatação
  //   fetch(`https://economia.awesomeapi.com.br/json/${moedaBase}-${moedaFinal}`)
  //     .then((respostaApi) => respostaApi.json())
  //     .then((resposta) => parseFloat(resposta[0].high))
  //     .catch(() => `Não Cosegui :(`)
  //     .then((currency) => currency.toLocaleString(userLang, currencySymb))
  //     .then((formatedCurrency) => setResultado(formatedCurrency));
  // }, [moedaBase, moedaFinal]);

  const selectMB = document.querySelector(".moeda-base");
  const selectMF = document.querySelector(".moeda-final");

  return (
    <main>
      <Container>
        <CurrencyBox>
          <span className="symb">{moedaBase}</span>
          <div>
            {(1.0).toLocaleString(navigator.language, {
              style: "currency",
              currency: moedaBase,
            })}
          </div>
          <hr />
          <div className="nome-moeda">{selectMB ? selectMB.value : "..."} </div>
        </CurrencyBox>
        <CurrencyBox className="Resultado" isFinalCurrency>
          <span className="symb">{moedaFinal}</span>
          <div>{resultado}</div>
          <hr />
          <div className="nome-moeda">{selectMF ? selectMF.value : "..."} </div>
        </CurrencyBox>
      </Container>
      <Container>
        <Select isFinalCurrency={true} list={Object.keys(optionMB)} />
      </Container>
    </main>
  );
}
