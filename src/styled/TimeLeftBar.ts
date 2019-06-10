import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";

export default styled(LinearProgress)((props: { fill: string }) => ({
  height: "30px !important",
  backgroundColor: `${props.fill}77 !important`,
  "& > div": {
    backgroundColor: props.fill
  }
}));
