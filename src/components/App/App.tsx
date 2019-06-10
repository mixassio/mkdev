import React, { Component } from "react";
import { Props, State } from "./App.spec";
import {randomInRange} from "./helpers";

import GameWindow from "../GameWindow";
import GameFrame from "../../styled/GameFrame";

const INITIAL_GAME_SPEED = 500;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      score: 0,
      timeLeft: 100,
      dicePair: [1, 1],
      result: 0,
      value: "",
      timerId: undefined,
      gameOver: false,
      gameSpeed: INITIAL_GAME_SPEED
    };
  }

  componentDidMount(): void {
    this.startTimer();

    window.setInterval(() => {
      this.setState(
        prevState => ({
          gameSpeed: prevState.gameSpeed - prevState.gameSpeed * 0.2
        }),
        () => {
          window.clearInterval(this.state.timerId);
          this.startTimer();
        }
      );
    }, 10000);

    this.play();
  }

  startTimer = () => {
    const id = window.setInterval(() => {
      const { timeLeft } = this.state;

      if (timeLeft <= 0) {
        this.finishGame();
        return;
      }

      this.decreaseTimer();
    }, this.state.gameSpeed);

    this.setState({ timerId: id });
  };

  finishGame = () => {
    const { timerId } = this.state;

    this.setState({ gameOver: true });

    window.clearInterval(timerId);
  };

  increaseScore = () =>
    this.setState(prevState => {
      return { score: prevState.score + 1 };
    });

  increaseTimer = (penalty?: number) =>
    this.setState(prevState => {
      let timeLeft = prevState.timeLeft + 1;

      if (penalty) {
        timeLeft =
          penalty + prevState.timeLeft > 100
            ? 100
            : penalty + prevState.timeLeft;
      }

      return {
        timeLeft
      };
    });

  decreaseTimer = (penalty?: number) =>
    this.setState(prevState => {
      return {
        timeLeft: penalty
          ? prevState.timeLeft - penalty
          : prevState.timeLeft - 1
      };
    });

  rollDice = () =>
    this.setState({
      dicePair: [randomInRange(1, 6), randomInRange(1, 6)]
    });

  generateResult = () =>
    this.setState({
      result: randomInRange(12, 20)
    });

  play = () => {
    this.clearInput();
    this.rollDice();
    this.generateResult();
  };

  clearInput = () => this.setState({ value: "" });

  nextStage = () => {
    const { dicePair, value, result } = this.state;
    const [arg1, arg2] = dicePair;
    const arg3 = parseInt(value);

    if (arg1 + arg2 + arg3 !== result) {
      this.decreaseTimer(20);
      return;
    }

    this.increaseTimer(20);
    this.increaseScore();

    this.play();
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const intVal = parseInt(value);

    if (!intVal && intVal !== 0 && value !== "") return;

    this.setState({ value });
  };

  handleInputValue = () => this.nextStage();

  getGameColor = () => {
    const { timeLeft } = this.state;

    let color = "#ff6c5c";

    if (timeLeft > 30) color = "#ffa000";
    if (timeLeft > 60) color = "#43a047";

    return color;
  };

  render(): React.ReactNode {
    const { dicePair, value, timeLeft, result, gameOver, score } = this.state;
    const [dice1, dice2] = dicePair;

    if (gameOver || timeLeft < 0)
      return (
        <GameFrame color="transparent">
          Game over! Your score is {score} points
        </GameFrame>
      );

    const color = this.getGameColor();

    return (
      <GameWindow
        color={color}
        timeLeft={timeLeft}
        dice1={dice1}
        dice2={dice2}
        result={result}
        value={value}
        score={score}
        handleInputChange={this.handleInputChange}
        handleInputValue={this.handleInputValue}
      />
    );
  }
}

export default App;
