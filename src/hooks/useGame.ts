import { useState } from "react";
import { Board, GameMode, GameStatus } from "../types/game";
import { generateBoard } from "../utils/generateBoard";
import { revealCells } from "../utils/revealCells";

type UseGameParams = {
    size: number;
    mines: number;
};

export function useGame({ size, mines }: UseGameParams) {
    const [board, setBoard] = useState<Board>(() => generateBoard({ size, mines }));
    const [mode, setMode] = useState<GameMode>('dig');
    const [status, setStatus] = useState<GameStatus>('playing');

    const handleCellPress = (row: number, col: number) => {
        if (status !== "playing") return;

        setBoard((prev) => {
            const cell = prev[row][col];

            if (mode === "flag") {
                if (cell.isRevealed) return prev;

                const newBoard = prev.map((r) =>
                    r.map((c) => ({ ...c }))
                );

                newBoard[row][col].isFlagged = !cell.isFlagged;
                return newBoard;
            }

            if (cell.isFlagged) return prev;

            if (cell.isMine) {
                setStatus("lost");

                return prev.map((r) =>
                    r.map((c) => ({
                        ...c,
                        isRevealed: true,
                    }))
                );
            }

            const newBoard = revealCells(prev, row, col);

            const hasWon = newBoard.every((r) =>
                r.every(
                    (c) => c.isMine || c.isRevealed
                )
            );

            if (hasWon) {
                setStatus("won");
            }

            return newBoard;
        });
    }

    const resetGame = () => {
        setStatus("playing");
        setMode("dig");
        setBoard(generateBoard({ size: 8, mines: 10 }));
    }

    const toggleMode = (newMode: GameMode) => {
        setMode(newMode);
    };

    return {
        board,
        mode,
        status,
        handleCellPress,
        toggleMode,
        resetGame,
    };
}