import React from "react";
import { Props } from "./GameWindow.spec";
import EquationContainer from "../../containers/EquationContainer";

import GameFrame from "../../styled/GameFrame";
import TimeLeftBar from "../../styled/TimeLeftBar";
import GameArea from "../../styled/GameArea";
import Score from "../../styled/Score";

const GameWindow = ({
  color,
  timeLeft,
  dice1,
  dice2,
  value,
  result,
  score,
  handleInputChange,
  handleInputValue
}: Props) => (
  <GameFrame color={color}>
    <TimeLeftBar
      variant="determinate"
      value={timeLeft < 100 ? timeLeft : 100}
      fill={color}
    />
    <GameArea>
      <EquationContainer
        dice1={dice1}
        dice2={dice2}
        result={result}
        value={value}
        score={score}
        handleInputChange={handleInputChange}
        handleInputValue={handleInputValue}
      />
      <Score>{score}</Score>
    </GameArea>
  </GameFrame>
);

export default GameWindow;
