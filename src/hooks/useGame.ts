import { useState, useEffect } from "react";
import { AppState } from "react-native";
import {Board, Cell, GameMode, GameStatus} from "../types/game";
import { generateBoard } from "../utils/generateBoard";
import { revealCells } from "../utils/revealCells";
import { useAudioPlayer } from "expo-audio";
import {useSettings} from "../context/SettingsContext";


type UseGameParams = {
    size: number;
    mines: number;
};

export function useGame({ size, mines }: UseGameParams) {
    const [board, setBoard] = useState<Board>(() => generateBoard({ size, mines }));
    const [mode, setMode] = useState<GameMode>('dig');
    const [status, setStatus] = useState<GameStatus>('playing');
    const [remainingFlags, setRemainingFlags] = useState<number>(mines);
    const [time, setTime] = useState(0);
    const [hintCount, setHintCount] = useState<number>(3);
    const bombSound = useAudioPlayer(require("../../assets/sounds/bomb.mp3"));
    const revealSound = useAudioPlayer(require("../../assets/sounds/reveal.mp3"));
    const winSound = useAudioPlayer(require("../../assets/sounds/win.mp3"));
    const { soundStatus } = useSettings();

    useEffect(() => {
        if (status !== "playing") return;
        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [status])

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextState) => {
            if (nextState !== "active" && status === "playing") {
                toggleStatus("idle");
            }
        });

        return () => {
            subscription.remove();
        };
    }, [status]);

    const handleCellPress = (row: number, col: number) => {
        if (status !== "playing") return;

        setBoard((prev) => {
            const cell = prev[row][col];
            if (cell.isRevealed) return prev;

            if (mode === "flag") {
                if (cell.isRevealed || (!cell.isFlagged && remainingFlags <= 0)) return prev;

                const cloneCell = (c: Cell) => ({ ...c });
                const newBoard = prev.map((r) => r.map(cloneCell));

                newBoard[row][col].isFlagged = !cell.isFlagged;

                findUsableFlags(newBoard);

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

    const findUsableFlags = (board: Board) => {
        const flagsPlaced = board.flat().filter(c => c.isFlagged || (c.isMine && c.isRevealed)).length;
        setRemainingFlags(mines - flagsPlaced);
    }

    const resetGame = () => {
        setStatus("playing");
        setMode("dig");
        setHintCount(3);
        setTime(0);
        setRemainingFlags(mines);
        setBoard(generateBoard({ size: size, mines: mines }));
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;

        return `${m}:${s.toString().padStart(2, "0")}`;
    }

    const handleHint = () => {
        if (hintCount <= 0)
            return;
        revealHint();
        setHintCount(prev => prev - 1);
    }

    const revealHint = () => {
        setBoard(prev => {
            const cloneCell = (c: Cell) => ({ ...c });
            const newBoard = prev.map(r => r.map(cloneCell));

            for (const row of newBoard) {
                for (const cell of row) {
                    if (cell.isMine && !cell.isFlagged && !cell.isRevealed) {
                        cell.isRevealed = true;
                        findUsableFlags(newBoard);
                        return newBoard;
                    }
                }
            }
            return prev;
        });
    };

    const toggleMode = (newMode: GameMode) => {
        setMode(newMode);
    };

    const toggleStatus = (newStatus: GameStatus) => {
        setStatus(newStatus);
    }

    const playBomb = () => {
        if (soundStatus === "off") return;
        bombSound.seekTo(0);
        bombSound.play();
    };

    const playReveal = () => {
        if (soundStatus === "off") return;
        revealSound.seekTo(0);
        revealSound.play();
    };

    const playWin = () => {
        if (soundStatus === "off") return;
        winSound.seekTo(0);
        winSound.play();
    };

    return {
        board,
        mode,
        status,
        remainingFlags,
        time,
        hintCount,
        handleCellPress,
        formatTime,
        handleHint,
        toggleMode,
        toggleStatus,
        resetGame,
    };
}