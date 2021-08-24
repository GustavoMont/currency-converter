import styled from 'styled-components'

const CurrencyBox = styled.div`
    --color: ${props => props.className ? '#00ff37' : '#e83e33'};
    color: var(--color);
    font-size: 32px;
    height: 150px;
    min-width: 40%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 2px #acacac solid;
    position: relative;

    background: linear-gradient(to bottom, hsla(0, 0%, 7%, 1) 0%, #1a1a1a 100%);

    margin-top: 32px;


    hr{
        width: 95%;
        border: gray 1px solid;
        margin: 16px 0;
    }
    .nome-moeda{
        font-size: 16px;
    }
    .symb{
        font-size: 12px;
        position: absolute;
        left: 5px;
        top: 8px;
        margin-bottom: 20px;
    }
    @media(max-width: 700px){
        width: 100%;
    }
`

export default CurrencyBox;