export interface Props {
    color: string;
    value: string;
    dicePair: [number, number];
    result: number;
    score: number;
    gameOver: boolean;
    setValue(val: any): void;
    newQwestion(): void;
    increaseScore(): void;
    setGameOver(): void;
    changeTimeLeft(newTimeLeft: number): void;
  }
  
  export interface State {
    timeLeft: number;
    timerId?: number;
    gameSpeed: number;
  };
