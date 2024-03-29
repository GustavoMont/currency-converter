import React from "react";
import StyledSpinner from "../styles/StylledSpinner";

const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50" data-testid="loading">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

export default Spinner;
