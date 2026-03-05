export type GameMode = 'dig' | 'flag';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export type SoundStatus = 'on' | 'off';

export type Theme = "dark" | "light";

export interface Cell {
    row: number;
    col: number;
    isFlagged: boolean;
    isMine: boolean;
    isRevealed: boolean;
    adjacentMines: number;
}

export type Board = Cell[][];