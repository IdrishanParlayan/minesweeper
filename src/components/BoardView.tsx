import {StyleSheet, View} from "react-native";
import type { Board, GameStatus } from "../types/game";
import CellView from "./CellView";
import {useSettings} from "../context/SettingsContext";

type Props = {
    readonly board: Board;
    readonly status: GameStatus;
    readonly onCellPress: (row: number, col: number) => void;
};

export default function BoardView({ board, status, onCellPress }: Props) {
    const { colors } = useSettings();
    const styles = createStyles(colors);

    return(
      <View style={styles.wrapper}>
          {board.map((row, r) => (
              <View key={`r-${r}`} style={styles.row}>
                  {row.map((cell, c) => (
                      <CellView
                          key={`c-${r}-${c}`}
                          cell={cell}
                          status={status}
                          onPress={() => onCellPress(r, c)}/>
                  ))}
              </View>
          ))}
      </View>
    );

}

const createStyles = (colors: any) =>
    StyleSheet.create({
        wrapper: {
            padding: 8,
            borderRadius: 16,
            backgroundColor: colors.board,
        },
        row: {
            flexDirection: "row",
            justifyContent: "center",
        },
    });