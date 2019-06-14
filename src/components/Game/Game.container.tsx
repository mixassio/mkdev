import React, { Component } from "react";
import { Game } from "./index";
import { Score, GameArea, Equation } from "../../styled";
import { Props, State } from "./Game.spec";
import { connect } from "react-redux";
import { actions } from "../../actionsRedusers";

const INITIAL_GAME_SPEED = 500;

const {
  dicePairActions,
  valueActions,
  scoreActions,
  gameOverActions,
  scoreBoardActions,
  timeLeftActions
} = actions;

const mapDispatchToProps = (dispatch: any, getState: any) => {
  return {
    setValue: (newVal: any) => dispatch(valueActions.setValue(newVal)),
    newQuestion: () => dispatch(dicePairActions.newQuestion()),
    increaseScore: () => dispatch(scoreActions.increaseScore()),
    setGameOver: () => {
      dispatch(gameOverActions.setGameOver());
      dispatch(scoreBoardActions.pushToScoreBoard({ endScore: getState().score }))
    },
    increaseTimer: (penalty?: any) => dispatch(timeLeftActions.increaseTimer(penalty)),
    decreaseTimer: (penalty?: any) => dispatch(timeLeftActions.decreaseTimer(penalty))

  };
};
const mapStateToProps = (state: any) => ({
  value: state.value,
  score: state.score,
  dicePair: state.dicePair,
  result: state.result,
  gameOver: state.gameOver,
  timeLeft: state.timeLeft
});

class GameContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
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

    this.props.newQuestion();
  }

  startTimer = () => {
    const id = window.setInterval(() => {
      const { timerId } = this.state;
      const { setGameOver, timeLeft, decreaseTimer } = this.props;

      if (timeLeft <= 0) {
        setGameOver();
        window.clearInterval(timerId);
        return;
      }

      decreaseTimer();
    }, this.state.gameSpeed);

    this.setState({ timerId: id });
  };

  nextStage = () => {
    const {
      dicePair: [arg1, arg2],
      result,
      newQuestion,
      value,
      increaseScore,
      increaseTimer,
      decreaseTimer
    } = this.props;
    const arg3 = parseInt(value);

    if (arg1 + arg2 + arg3 !== result) {
      decreaseTimer({ penalty: 20 });
      return;
    }

    increaseTimer({ penalty: 20 });
    increaseScore();
    newQuestion();
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
    const {
      color,
      value,
      dicePair: [dice1, dice2],
      result,
      score,
      timeLeft
    } = this.props;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
