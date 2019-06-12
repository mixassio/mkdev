export interface Props {
    color: string;
    setValue(val: any): void;
    changeScore(newScore: number): void;
    changeTimeLeft(newTimeLeft: number): void;
    changeGameOver(newGameOver: boolean): void;
  }
  
  export interface State {
    score: number;
    timeLeft: number;
    dicePair: [number, number];
    result: number;
    newValue: string;
    timerId?: number;
    gameOver: boolean;
    gameSpeed: number;
  };
