import { Board, Cell } from "../types/game";

type GenerateBoardParams = {
    readonly size: number;
    readonly mines: number;
};

export function generateBoard({ size, mines }: GenerateBoardParams): Board {
    const board: Board = Array.from({ length: size }, (_, row) =>
        Array.from({ length: size }, (_, col): Cell => ({
            row,
            col,
            isFlagged: false,
            isMine: false,
            isRevealed: false,
            adjacentMines: 0,
        }))
    );

    let minesPlaced = 0;

    while (minesPlaced < mines) {
        const randomRow = Math.floor(Math.random() * size);
        const randomCol = Math.floor(Math.random() * size);

        if (!board[randomRow][randomCol].isMine) {
            board[randomRow][randomCol].isMine = true;
            minesPlaced++;
        }
    }

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
    ];

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col].isMine) continue;

            let count = 0;

            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc

                if( newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && board[newRow][newCol].isMine)
                    count++;
            }
            board[row][col].adjacentMines = count;
        }
    }
    return board;
}