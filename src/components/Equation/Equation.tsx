import React from "react";
import { Props } from "./Equation.spec";

import EquationBlock from "../../styled/Equation";

const Equation = ({
  dice1,
  dice2,
  value,
  result,
  handleInputChange,
  handleKeyPress
}: Props) => (
  <EquationBlock>
    <span>{dice1}</span>
    <span>+</span>
    <span>{dice2}</span>
    <span>+</span>
    <input
      type="text"
      min={0}
      max={20}
      value={value}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
    <span>=</span>
    <span>{result}</span>
  </EquationBlock>
);

export default Equation;
