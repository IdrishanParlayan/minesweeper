import { useState } from "react";
import {Board, Cell, GameMode, GameStatus} from "../types/game";
import { generateBoard } from "../utils/generateBoard";
import { revealCells } from "../utils/revealCells";
import { useAudioPlayer } from "expo-audio";


type UseGameParams = {
    size: number;
    mines: number;
};

export function useGame({ size, mines }: UseGameParams) {
    const [board, setBoard] = useState<Board>(() => generateBoard({ size, mines }));
    const [mode, setMode] = useState<GameMode>('dig');
    const [status, setStatus] = useState<GameStatus>('playing');
    const bombSound = useAudioPlayer(require("../../assets/sounds/bomb.mp3"));
    const revealSound = useAudioPlayer(require("../../assets/sounds/reveal.mp3"));
    const winSound = useAudioPlayer(require("../../assets/sounds/win.mp3"));

    const handleCellPress = (row: number, col: number) => {
        if (status !== "playing") return;

        setBoard((prev) => {
            const cell = prev[row][col];
            if (cell.isRevealed) return prev;

            if (mode === "flag") {
                if (cell.isRevealed) return prev;

                const cloneCell = (c: Cell) => ({ ...c });
                const newBoard = prev.map((r) => r.map(cloneCell));

                newBoard[row][col].isFlagged = !cell.isFlagged;
                return newBoard;
            }

            if (cell.isFlagged) return prev;

            if (cell.isMine) {
                playBomb();
                setStatus("lost");

                const cloneCell = (c: Cell) => ({ ...c, isRevealed: true });
                return prev.map((r) => r.map(cloneCell));
            }

            const newBoard = revealCells(prev, row, col);

            const isCellValid = (c: Cell) => c.isMine || c.isRevealed;
            const hasWon = newBoard.every((r) => r.every(isCellValid));

            if (hasWon) {
                playWin()
                setStatus("won");
            } else
                playReveal();

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

    const toggleStatus = (newStatus: GameStatus) => {
        setStatus(newStatus);
    }

    const playBomb = () => {
        bombSound.seekTo(0);
        bombSound.play();
    };

    const playReveal = () => {
        revealSound.seekTo(0);
        revealSound.play();
    };

    const playWin = () => {
        winSound.seekTo(0);
        winSound.play();
    };

    return {
        board,
        mode,
        status,
        handleCellPress,
        toggleMode,
        toggleStatus,
        resetGame,
    };
}