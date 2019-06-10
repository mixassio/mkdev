import React from "react";

export interface EquationSpec {
  dice1: number;
  dice2: number;
  result: number;
  value: string;
  score: number;
  handleInputChange(e: React.FormEvent<HTMLInputElement>): void;
}

export interface Props extends EquationSpec {
  handleKeyPress(e: React.KeyboardEvent): void;
}

export interface ContainerProps extends EquationSpec {
  handleInputValue(): void;
}
