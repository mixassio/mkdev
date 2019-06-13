export interface Props {
    color: string;
    value: string;
    dicePair: [number, number];
    result: number;
    score: number;
    gameOver: boolean;
    timeLeft: number;
    setValue(val: any): void;
    newQwestion(): void;
    increaseScore(): void;
    setGameOver(): void;
    increaseTimer(penalty?: object): void;
    decreaseTimer(penalty?: object): void;
  }
  
  export interface State {
    timerId?: number;
    gameSpeed: number;
  };
