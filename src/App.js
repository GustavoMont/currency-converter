import React, { useState, useEffect } from 'react';
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
    const [resultado, setResultado] = useState('...')
    const optionMB = {'Dólar Americano': 'USD', 'Real Brasileiro': 'BRL',
                    'Euro': 'EUR' , 'Libra Esterlina': 'GBP' ,'Iene': 'JPY' ,'Dólar Australiano': 'AUD' ,
                    'Dólar Canadense': 'CAD' }
    const optionMF = {'Real Brasileiro': 'BRL', 'Dólar Americano': 'USD', 
    'Euro': 'EUR' , 'Libra Esterlina': 'GBP' ,'Iene': 'JPY' ,'Dólar Australiano': 'AUD' ,
    'Dólar Canadense': 'CAD' }
    const [moedaBase, setMoedaBase] = useState('USD')
    const [moedaFinal, setMoedaFinal] = useState('BRL')

    const changeSelect = (e, oposit) => {
        const namesOption = Object.keys(optionMF)
        const valuesOption = Object.values(optionMF)
        const isMoedaFinal = !(oposit === 'moeda-final')
        let troca = isMoedaFinal ? moedaFinal : moedaBase
        const other = document.querySelector(`.${oposit}`)
        if (e.target.value === other.value) {
            if (isMoedaFinal){
                setMoedaBase(troca)
            }
            else{
                setMoedaFinal(troca)
            }
            other.value = namesOption[valuesOption.indexOf(troca)]
        }
        if (isMoedaFinal){
            setMoedaFinal(optionMF[e.target.value])
        }
        else{
            setMoedaBase(optionMF[e.target.value])
        }
    }
    const makeOption = (item) => {
        return (
            <option>{item}</option>
        )
    }
    useEffect(() => {
        setResultado('...')
        const userLang = navigator.language
        const currencySymb = { style: 'currency', currency: moedaFinal }
        fetch(`https://economia.awesomeapi.com.br/json/${moedaBase}-${moedaFinal}`)
            .then(respostaApi => respostaApi.json())
            .then(resposta => parseFloat(resposta[0].high))
            .catch(error => `Não Cosegui :(`)
            .then(currency => currency.toLocaleString(userLang, currencySymb))
            .then(formatedCurrency => setResultado(formatedCurrency))

    }, [moedaBase, moedaFinal])


    return (
        <>
            <h1>{resultado}</h1>
            <Select className="moeda-base" change={changeSelect}
                oposit={'moeda-final'} list={Object.keys(optionMB)} content={makeOption} />
            <Select className="moeda-final" change={changeSelect}
                oposit={'moeda-base'} list={Object.keys(optionMF)} content={makeOption} />
        </>
    )
}