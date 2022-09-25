import styled from "styled-components";

const SelectCurrency = styled.div`
  width: 300px;
  max-width: 100%;

  font-size: 1.2rem;
  margin-top: 2rem;

  background-color: ${(props) =>
    props.isFinalCurrency ? "#00ff37" : "#e83e33"};

  position: relative;

  .active-option {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${({ isActive }) => (isActive ? "2px" : "0")} solid #000;
    div {
      pointer-events: none;
    }
    .icon {
      width: 24px;
      margin: 0;
      padding: 0;
      svg {
        transform: rotate(${({ isActive }) => (isActive ? "180deg" : "0")});
        transition: all 0.5s ease;
      }
    }
  }

  .options-container {
    background-color: ${(props) =>
      props.isFinalCurrency ? "#00ff37" : "#e83e33"};

    position: absolute;
    width: 100%;
    left: 0;
    opacity: ${({ isActive }) => (isActive ? "1" : "0")};
    height: ${({ isActive }) => (isActive ? "fit-content" : "0px")};
    overflow: hidden;
    div {
      padding: 0.5rem 1rem;
    }
  }
`;
export default SelectCurrency;
