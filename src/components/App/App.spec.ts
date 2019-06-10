export interface State {
  score: number;
  timeLeft: number;
  dicePair: [number, number];
  result: number;
  value: string;
  timerId?: number;
  gameOver: boolean;
  gameSpeed: number;
}

export interface Props {}
