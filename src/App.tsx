import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";

const randomInRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const INITIAL_GAME_SPEED = 500;

interface Props {}

interface State {
  score: number;
  timeLeft: number;
  dicePair: [number, number];
  result: number;
  value: string;
  timerId?: number;
  gameOver: boolean;
  gameSpeed: number;
}

const BorderLinearProgress = styled(LinearProgress)(
  (props: { fill: string }) => ({
    height: "30px !important",
    backgroundColor: `${props.fill}77 !important`,
    "& > div": {
      backgroundColor: props.fill
    }
  })
);

const GameWindow = styled.div`
  width: 320px;
  border: 1px solid ${props => props.color};

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  font-family: "Roboto", sans-serif;
  font-size: 20px;
`;

const GameArea = styled.div`
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Score = styled.div`
  float: right;
  font-size: 25px;
`;

const Equation = styled.span`
  display: inline-flex;
  align-items: center;

  & span {
    width: 22px;
    height: 22px;
    line-height: 22px;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
  }

  & input {
    width: 22px;
  }
`;

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

  handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    this.nextStage();
  };

  render(): React.ReactNode {
    const { dicePair, value, timeLeft, result, gameOver, score } = this.state;
    const [dice1, dice2] = dicePair;

    if (gameOver || timeLeft < 0)
      return (
        <GameWindow color="transparent">
          You lose! Your score is {score} points
        </GameWindow>
      );

    let color = "#ff6c5c";

    if (timeLeft > 30) color = "#ffa000";
    if (timeLeft > 60) color = "#43a047";

    return (
      <GameWindow color={color}>
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
      </GameWindow>
    );
  }
}

export default App;
