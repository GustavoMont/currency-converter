import styled from "styled-components";

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 36px;
  height: 36px;
  margin-top: -28px;

  & .path {
    stroke: var(--green);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default StyledSpinner;
