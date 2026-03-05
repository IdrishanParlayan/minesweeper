import type { Cell, GameStatus } from "../types/game";
import {Pressable, StyleSheet, Text, ViewStyle} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {useSettings} from "../context/SettingsContext";

type Props = {
    readonly cell: Cell;
    readonly status: GameStatus;
    readonly onPress: () => void;
};

export default function CellView({ cell, status, onPress }: Props) {
    const { colors } = useSettings();
    const styles = createStyles(colors);

    const disabled = status !== "playing";

    const baseStyle: ViewStyle[] = [styles.cell];
    if (cell.isRevealed) baseStyle.push(styles.cellRevealed);
    if (cell.isFlagged) baseStyle.push(styles.cellFlagged);


    let label = null;
    if (cell.isFlagged) label = <FontAwesome name="flag" size={16} color="red" />
    else if (cell.isRevealed && cell.isMine) label = <FontAwesome name="bomb" size={18} color="red" />;
    else if (cell.isRevealed && cell.adjacentMines > 0) label = String(cell.adjacentMines);

    return (
        <Pressable style={baseStyle} onPress={onPress} disabled={disabled}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        cell: {
            width: 38,
            height: 38,
            borderRadius: 8,
            backgroundColor: colors.cell,

            borderTopWidth: 3,
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderBottomWidth: 3,

            borderTopColor: colors.cellHighlight,
            borderLeftColor: colors.cellHighlight,

            borderRightColor: colors.cellShadow,
            borderBottomColor: colors.cellShadow,

            alignItems: "center",
            justifyContent: "center",
            margin: 3,
        },

        cellRevealed: {
            backgroundColor: colors.cellRevealed,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },

        cellFlagged: {
            backgroundColor: colors.cellFlagged,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },

        text: {
            fontSize: 16,
            fontWeight: "800",
        },
    });