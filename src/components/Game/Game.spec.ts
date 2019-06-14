export interface Props {
  color: string;
  value: string;
  dicePair: [number, number];
  result: number;
  score: number;
  gameOver: boolean;
  timeLeft: number;
  setValue(val: any): void;
  newQuestion(): void;
  increaseScore(): void;
  setGameOver(): void;
  increaseTimer(penalty?: any): void;
  decreaseTimer(penalty?: any): void;
}

export interface State {
  timerId?: number;
  gameSpeed: number;
}
