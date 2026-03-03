import { Board } from "../types/game";

export function  revealCells(
    board: Board,
    startRow: number,
    startCol: number,
): Board {
    const size = board.length;

    const newBoard = board.map((row) =>
        row.map((cell) => ({...cell}))
    );

    const queue: [number, number][] = [];
    queue.push([startRow, startCol]);

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
    ];

    while (queue.length > 0) {
        const item = queue.shift();
        if (!item) continue;

        const [row, col] = item;
        const cell = newBoard[row][col];

        if (cell.isRevealed || cell.isFlagged) continue;

        cell.isRevealed = true;

        if (cell.adjacentMines > 0) continue;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                const neighbor = newBoard[newRow][newCol];
                if (!neighbor.isRevealed && !neighbor.isMine)
                    queue.push([newRow, newCol]);
            }
        }
    }
    return newBoard;
}