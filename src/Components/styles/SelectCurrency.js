import styled from 'styled-components';


const SelectCurrency = styled.select`
    width: 300px;
    max-width: 100%;

    font-size: 1.2rem;

    padding: .8rem 1rem;
    margin-top: 2rem;

    background-color: ${props => props.className === 'moeda-final'? '#00ff37' : '#e83e33'};

`
export default SelectCurrency;