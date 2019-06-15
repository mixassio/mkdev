import React, { Component } from "react";
import { connect } from "react-redux";
import { Props, State } from "./Statistics.spec";

const mapStateToProps = (state: any) => ({
  scoreBoard: state.scoreBoard
});

class Statistics extends Component<Props, State> {
  render(): React.ReactNode {
    const { scoreBoard } = this.props;

    return (
      <table>
        <caption>Список рекордов</caption>
        <tr>
          <th>Дата</th>
          <th>Количество баллов</th>
        </tr>
        {scoreBoard.map((rec: any) => (
          <tr>
            <td>{rec.achieved}</td>
            <td>{rec.score}</td>
          </tr>
        ))}
      </table>
    );
  }
}

export default connect(mapStateToProps)(Statistics);
