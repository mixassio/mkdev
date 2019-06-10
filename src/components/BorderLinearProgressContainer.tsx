import React, { Component } from "react";
import { BorderLinearProgress, Score, GameArea, Equation } from './index';

const randomInRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const INITIAL_GAME_SPEED = 500;

interface Props {
  color: string;
  changeScore(newScore: number): void;
  changeTimeLeft(newTimeLeft: number): void;
  changeGameOver(newGameOver: boolean): void;
}

interface State {
  score: number;
  timeLeft: number;
  dicePair: [number, number];
  result: number;
  value: string;
  timerId?: number;
  gameOver: boolean;
  gameSpeed: number;
};

class BorderLinearProgressContainer extends Component<Props, State> {
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

    this.setState({
      value: "",
      dicePair: [randomInRange(1, 6), randomInRange(1, 6)],
      result: randomInRange(12, 20),
    })
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
   this.props.changeGameOver(true);
    this.setState({ gameOver: true });

    window.clearInterval(timerId);
  };

  increaseScore = () => {
    this.setState(prevState => {
      this.props.changeScore(prevState.score + 1);
      return { score: prevState.score + 1 };
    })
  }
  ;

  increaseTimer = (penalty?: number) =>
    this.setState(prevState => {
      let timeLeft = prevState.timeLeft + 1;

      if (penalty) {
        timeLeft =
          penalty + prevState.timeLeft > 100
            ? 100
            : penalty + prevState.timeLeft;
      }
      this.props.changeTimeLeft(timeLeft);
      return {
        timeLeft
      };
    });

  decreaseTimer = (penalty?: number) =>
    this.setState(prevState => {
      const timeLeft = penalty
        ? prevState.timeLeft - penalty
        : prevState.timeLeft - 1
      this.props.changeTimeLeft(timeLeft);
      return {
        timeLeft
      }
    });

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

    this.setState({
      value: "",
      dicePair: [randomInRange(1, 6), randomInRange(1, 6)],
      result: randomInRange(12, 20),
    });
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const intVal = parseInt(value);

    if (!intVal && intVal !== 0 && value !== "") return;

    this.setState({ value });
  };

  handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    this.nextStage();
  };

  render(): React.ReactNode {
    const { color } = this.props;
    const { dicePair, value, timeLeft, result, score } = this.state;
    const [dice1, dice2] = dicePair;

    return (
      <>
        <BorderLinearProgress
          variant="determinate"
          value={timeLeft < 100 ? timeLeft : 100}
          fill={color}
        />
        <GameArea>
          <Equation>
            <span>{dice1}</span>
            <span>+</span>
            <span>{dice2}</span>
            <span>+</span>
            <input
              type="text"
              min={0}
              max={20}
              value={value}
              onChange={this.handleInputChange}
              onKeyPress={this.handleInputKeyPress}
            />
            <span>=</span>
            <span>{result}</span>
          </Equation>
        <Score>{score}</Score>
        </GameArea>
      </>
    );
  }

}





export default BorderLinearProgressContainer;
