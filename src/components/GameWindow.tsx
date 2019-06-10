import styled from "styled-components";

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

export default GameWindow;
