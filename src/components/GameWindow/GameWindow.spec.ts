import React from "react";

export interface Props {
  color: string;
  timeLeft: number;
  dice1: number;
  dice2: number;
  result: number;
  value: string;
  score: number;
  handleInputChange(e: React.FormEvent<HTMLInputElement>): void;
  handleInputValue(): void;
}
