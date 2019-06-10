import styled from "styled-components";

export default styled.span`
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
