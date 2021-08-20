import React, { useState, useEffect } from 'react';
import SelectCurrency from './Components/SelectCurrency';


export default function App(){
    const [moedaBase, setMoedaBase] = useState('BRL')
    const [moedaFinal, setMoedaFinal] = useState('USD')
    const [resultado, setResultado] = useState('...')
    useEffect( () => {
        setResultado('...')
        fetch(`https://economia.awesomeapi.com.br/json/${moedaBase}-${moedaFinal}`)
        .then(respostaApi => respostaApi.json())
        .then(resposta => resposta[0].high)
        .then(currency => setResultado(parseFloat(currency).toLocaleString(moedaFinal)))

    }, [moedaBase, moedaFinal])
    
    return (
        <>
            <h1>{resultado}</h1>
            <SelectCurrency onChange={e => {
                const selectMF = document.querySelector('.moeda-final')
                if (e.target.value === selectMF.value) {
                    selectMF.value = moedaBase
                    setMoedaFinal(moedaBase)                 
                }
                setMoedaBase(e.target.value)
            }} className="moeda-base">
                <option>BRL</option>
                <option>USD</option>
            </SelectCurrency>
            <SelectCurrency className="moeda-final" onChange={e =>{
                const selectMB = document.querySelector('.moeda-base')
                if (e.target.value === selectMB.value) {
                    selectMB.value = moedaFinal
                    setMoedaBase(moedaFinal)                 
                }
                setMoedaFinal(e.target.value)
            }}>
                <option>USD</option>
                <option>BRL</option>
            </SelectCurrency>
        </>
    )
}