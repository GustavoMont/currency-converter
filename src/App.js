import React, { useState, useEffect } from 'react';
import Container from './Components/Container';
import CurrencyBox from './Components/CurrencyBox';
import SelectCurrency from './Components/SelectCurrency';



function Select(props) {
    return (
        <SelectCurrency className={props.className}
            onChange={e => props.change(e, props.oposit)}>
            {props.list.map(item => {
                return props.content(item)
            })}
        </SelectCurrency>
    )
}


export default function App() {
    // Mostra os resultados da Consulta ================
    const [resultado, setResultado] = useState('...')
    // São as opções disponíveis ==============================
    const optionMB = {
        'Dólar Americano': 'USD', 'Real Brasileiro': 'BRL', 'Euro': 'EUR',
        'Libra Esterlina': 'GBP', 'Iene': 'JPY', 'Dólar Australiano': 'AUD', 'Dólar Canadense': 'CAD'
    }
    const optionMF = {
        'Real Brasileiro': 'BRL', 'Dólar Americano': 'USD', 'Euro': 'EUR',
        'Libra Esterlina': 'GBP', 'Iene': 'JPY', 'Dólar Australiano': 'AUD', 'Dólar Canadense': 'CAD'
    }
    // Variáveis que serão usadas para consumir a API =====================================
    const [moedaBase, setMoedaBase] = useState('USD')
    const [moedaFinal, setMoedaFinal] = useState('BRL')
    // Funções úteis ============================================= 
    const changeSelect = (e, oposit) => {
        const namesOption = Object.keys(optionMF)
        const valuesOption = Object.values(optionMF)
        const isMoedaFinal = !(oposit === 'moeda-final')
        let troca = isMoedaFinal ? moedaFinal : moedaBase
        const other = document.querySelector(`.${oposit}`)
        if (e.target.value === other.value) {
            if (isMoedaFinal) {
                setMoedaBase(troca)
            }
            else {
                setMoedaFinal(troca)
            }
            other.value = namesOption[valuesOption.indexOf(troca)]
        }
        if (isMoedaFinal) {
            setMoedaFinal(optionMF[e.target.value])
        }
        else {
            setMoedaBase(optionMF[e.target.value])
        }
    }
    const makeOption = (item) => {
        return (
            <option>{item}</option>
        )
    }
    // Faz a consulta na API ============================== 
    useEffect(() => {
        const userLang = navigator.language
        setResultado('...')
        const currencySymb = { style: 'currency', currency: moedaFinal } // Estilo da Formatação 
        fetch(`https://economia.awesomeapi.com.br/json/${moedaBase}-${moedaFinal}`)
            .then(respostaApi => respostaApi.json())
            .then(resposta => parseFloat(resposta[0].high))
            .catch(() => `Não Cosegui :(`)
            .then(currency => currency.toLocaleString(userLang, currencySymb))
            .then(formatedCurrency => setResultado(formatedCurrency))

    }, [moedaBase, moedaFinal])

    const selectMB = document.querySelector('.moeda-base')
    const selectMF = document.querySelector('.moeda-final')

    return (
        <main>
            <Container>
                <CurrencyBox >
                    <span className="symb">{moedaBase}</span>
                    <div>{1.00.toLocaleString(navigator.language, { style: 'currency', currency: moedaBase })}</div>
                    <hr />
                    <div className="nome-moeda">{selectMB ? selectMB.value : '...'} </div>
                </CurrencyBox>
                <CurrencyBox className="Resultado">
                    <span className="symb">{moedaFinal}</span>
                    <div>{resultado}</div>
                    <hr />
                    <div className="nome-moeda">{selectMF ? selectMF.value : '...'} </div>
                </CurrencyBox>
            </Container>
            <Container>
                <Select className="moeda-base" change={changeSelect}
                    oposit={'moeda-final'} list={Object.keys(optionMB)} content={makeOption} />
                <Select className="moeda-final" change={changeSelect}
                    oposit={'moeda-base'} list={Object.keys(optionMF)} content={makeOption} />
            </Container>
        </main>
    )
}