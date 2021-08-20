import React, { useState } from 'react';
import SelectCurrency from './Components/SelectCurrency';


export default function App(){
    const [conteudo, setConteudo] = useState('Ola, mundo')
    let moedaBase = 'BRL'
    let moedaFinal = 'USD'
    const seila = async () =>{
        console.log(moedaBase, moedaFinal)
        setConteudo ( await fetch(`https://economia.awesomeapi.com.br/json/${moedaBase}-${moedaFinal}`)
        .then(respostaApi => respostaApi.json())
        .then(resposta => `${resposta[0].name}`)
        .catch(() => 'Ocorreu um erro. Perdão :(')
        )
        
    }
    return (
        <>
            <h1 onClick={seila}>{conteudo}</h1>
            <SelectCurrency onChange={(e) =>{
                if (e.target.value === moedaFinal) {
                    const selectMoedaFinal = e.target.nextElementSibling 
                    selectMoedaFinal.value = moedaBase
                    moedaFinal = moedaBase
                }
                moedaBase = e.target.value
                console.log(moedaBase, moedaFinal)
            }}>
                <option>BRL</option>
                <option>USD</option>
            </SelectCurrency>
            <SelectCurrency onChange={(e) =>{
                if (e.target.value === moedaBase) {
                    const selectMoedaFinal = e.target.previousElementSibling
                    selectMoedaFinal.value = moedaFinal
                    moedaBase = moedaFinal
                }
                moedaFinal = e.target.value
                console.log(moedaBase, moedaFinal)
            }}>
                <option>USD</option>
                <option>BRL</option>
            </SelectCurrency>
        </>
    )
}