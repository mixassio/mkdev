import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";

const Game = styled(LinearProgress)((props: { fill: string }) => ({
  height: "30px !important",
  backgroundColor: `${props.fill}77 !important`,
  "& > div": {
    backgroundColor: props.fill
  }
}));

export default Game;
