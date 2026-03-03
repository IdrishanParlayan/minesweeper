import type { Cell, GameStatus } from "../types/game";
import {Pressable, StyleSheet, Text, ViewStyle} from "react-native";

type Props = {
    cell: Cell;
    status: GameStatus;
    onPress: () => void;
};

export default function CellView({ cell, status, onPress }: Props) {
    const disabled = status !== "playing";

    const baseStyle: ViewStyle[] = [styles.cell];
    if (cell.isRevealed) baseStyle.push(styles.cellRevealed);
    if (cell.isFlagged) baseStyle.push(styles.cellFlagged);


    let label = "";
    if (cell.isFlagged) label = "🚩"
    else if (cell.isRevealed && cell.isMine) label = "💣";
    else if (cell.isRevealed && cell.adjacentMines > 0) label = String(cell.adjacentMines);

    return (
        <Pressable style={baseStyle} onPress={onPress} disabled={disabled}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    cell: {
        width: 38,
        height: 38,
        borderRadius: 6,
        backgroundColor: "#d6d6d6",
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderTopColor: "#ffffff",
        borderLeftColor: "#ffffff",
        borderRightColor: "#999999",
        borderBottomColor: "#999999",
        alignItems: "center",
        justifyContent: "center",
        margin: 3,
    },

    cellRevealed: {
        backgroundColor: "#c0c0c0",
        borderTopColor: "#999999",
        borderLeftColor: "#999999",
        borderRightColor: "#ffffff",
        borderBottomColor: "#ffffff",
    },

    cellFlagged: {
        backgroundColor: "#ffe0e0",
    },

    text: {
        fontSize: 16,
        fontWeight: "800",
    },
});