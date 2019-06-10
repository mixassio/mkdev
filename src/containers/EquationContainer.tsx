import React from "react";
import Equation from "../components/Equation";
import { ContainerProps } from "../components/Equation/Equation.spec";

const EquationContainer = ({ handleInputValue, ...rest }: ContainerProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    handleInputValue();
  };

  return <Equation {...rest} handleKeyPress={handleKeyPress} />;
};

export default EquationContainer;
