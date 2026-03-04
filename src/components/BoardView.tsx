import {StyleSheet, View} from "react-native";
import type { Board, GameStatus } from "../types/game";
import CellView from "./CellView";
import { colors } from "../theme/theme";



type Props = {
    readonly board: Board;
    readonly status: GameStatus;
    readonly onCellPress: (row: number, col: number) => void;
};

export default function BoardView({ board, status, onCellPress }: Props) {

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

const styles = StyleSheet.create({
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