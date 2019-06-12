import React, { Component } from "react";
import { Game } from './index';
import { Score, GameArea, Equation } from '../../styled';
import { Props, State } from './Game.spec';
import { connect } from 'react-redux';
import { setValue, newQwestion, increaseScore, setGameOver } from '../../actions'

const INITIAL_GAME_SPEED = 500;


const mapDispatchToProps = (dispatch: any) => {
  return {
    setValue: (newVal: any) => dispatch(setValue(newVal)),
    newQwestion: () => dispatch(newQwestion()),
    increaseScore: () => dispatch(increaseScore()),
    setGameOver: () => dispatch(setGameOver()),
  }
}
const mapStateToProps = (state: any) => ({
  value: state.value,
  score: state.score,
  dicePair: state.dicePair,
  result: state.result,
  gameOver: state.gameOver,
});

class GameContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      timeLeft: 100,
      timerId: undefined,
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

    this.props.newQwestion();
  }

  startTimer = () => {
    const id = window.setInterval(() => {
      const { timeLeft, timerId } = this.state;
      const { setGameOver } = this.props;

      if (timeLeft <= 0) {
        setGameOver();
        window.clearInterval(timerId);
        return;
      }

      this.decreaseTimer();
    }, this.state.gameSpeed);

    this.setState({ timerId: id });
  };

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
    const { dicePair: [arg1, arg2], result, newQwestion, value, increaseScore } = this.props;
    const arg3 = parseInt(value);

    if (arg1 + arg2 + arg3 !== result) {
      this.decreaseTimer(20);
      return;
    }

    this.increaseTimer(20);
    increaseScore();
    newQwestion();    
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { setValue } = this.props;
    const valueCurrent = e.currentTarget.value;
    const intVal = parseInt(valueCurrent);
    if (!intVal && intVal !== 0 && valueCurrent !== "") return;
    setValue({ value: valueCurrent });
  };

  handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    this.nextStage();
  };

  render(): React.ReactNode {
    const { color, value, dicePair: [dice1, dice2], result, score } = this.props;
    const { timeLeft } = this.state;

    return (
      <>
        <Game
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


export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);