import React, { Component } from "react";
import { connect } from 'react-redux';
import { GameContainer } from '../Game';
import { GameWindow } from '../../styled';
import { Props, State } from "./App.spec";

const mapStateToProps = (state: any) => ({
  score: state.score,
  gameOver: state.gameOver,
});
class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      timeLeft: 100,
    };
  }

  changeTimeLeft = (newTimeLeft: number) => this.setState({ timeLeft: newTimeLeft });

  render(): React.ReactNode {
    const { timeLeft } = this.state;
    const { score, gameOver } = this.props;
    const over = gameOver || timeLeft < 0;

    let color = "#ff6c5c";
    if (over) color = "transparent";
    if (timeLeft > 30) color = "#ffa000";
    if (timeLeft > 60) color = "#43a047";

    return (
      <GameWindow color={color}>
        {over ?
          `You lose! Your score is ${score} points` :
          <GameContainer
            color={color}
            changeTimeLeft={this.changeTimeLeft}
          />
        }
      </GameWindow>
    );
  }
}

export default connect(mapStateToProps)(App);