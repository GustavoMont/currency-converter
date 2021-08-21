import React, { useState, useEffect } from 'react';
import SelectCurrency from './Components/SelectCurrency';


function Select(props){
    return (
        <SelectCurrency  className={props.className} 
        onChange={e => props.change(e, props.oposit)}>
                <option>{props.content[0]}</option>
                <option>{props.content[1]}</option>
                <option>{props.content[2]}</option>
        </SelectCurrency>
    )
}


export default function App(){
    const [moedaBase, setMoedaBase] = useState('USD')
    const [moedaFinal, setMoedaFinal] = useState('BRL')
    const [resultado, setResultado] = useState('...')

    const changeSelect = (e, oposit) =>{
        const isMoedaFinal = !(oposit === 'moeda-final')
        let troca = isMoedaFinal ? moedaFinal : moedaBase

        const other = document.querySelector(`.${oposit}`)
        if (e.target.value === other.value) {
            if (isMoedaFinal) 
                setMoedaBase(troca)
            else 
                setMoedaFinal(troca)
            other.value = troca
        }
        if (isMoedaFinal) 
            setMoedaFinal(e.target.value)
        else 
            setMoedaBase(e.target.value)
    }

    useEffect( () => {
        setResultado('...')
        
        const userLang = navigator.language
        const currencySymb = { style: 'currency', currency: moedaFinal }
        fetch(`https://economia.awesomeapi.com.br/json/${moedaBase}-${moedaFinal}`)
        .then(respostaApi => respostaApi.json())
        .then(resposta => parseFloat(resposta[0].high))
        .then(currency => currency.toLocaleString(userLang, currencySymb))
        .then(formatedCurrency => setResultado(formatedCurrency))

    }, [moedaBase, moedaFinal])
    
    return (
        <>
            <h1>{resultado}</h1>
            
            <Select className="moeda-base" change={changeSelect} 
            oposit={'moeda-final'} content={['USD', 'BRL', 'EUR']} /> 
            <Select className="moeda-final" change={changeSelect} 
            oposit={'moeda-base'} content={['BRL', 'USD', 'EUR']}/>
        </>
    )
}