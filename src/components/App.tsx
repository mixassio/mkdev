import React, { Component } from "react";
import { GameWindow, BorderLinearProgressContainer } from './index';


interface Props {}

interface State {
  score: number;
  timeLeft: number;
  gameOver: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      score: 0,
      timeLeft: 100,
      gameOver: false,
    };
  }

  changeScore = (newScore: number) => this.setState({ score: newScore });
  changeTimeLeft = (newTimeLeft: number) => this.setState({ timeLeft: newTimeLeft });
  changeGameOver = (newGameOver: boolean) => this.setState({ gameOver: newGameOver });

  render(): React.ReactNode {
    const { timeLeft, gameOver, score } = this.state;

    const over = gameOver || timeLeft < 0;

    let color = "#ff6c5c";
    if (over) color = "transparent";
    if (timeLeft > 30) color = "#ffa000";
    if (timeLeft > 60) color = "#43a047";

    return (
      <GameWindow color={color}>
        {over ?
          `You lose! Your score is ${score} points` :
          <BorderLinearProgressContainer
            color={color}
            changeScore={this.changeScore}
            changeTimeLeft={this.changeTimeLeft}
            changeGameOver={this.changeGameOver}
          />
        }
      </GameWindow>
    );
  }
}

export default App;
