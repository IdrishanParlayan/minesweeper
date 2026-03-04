import { SafeAreaView } from 'react-native-safe-area-context';
import {Text, StyleSheet, View, Pressable} from "react-native";
import BoardView from "../components/BoardView";
import { useGame } from "../hooks/useGame";
import PauseModal from "../components/PauseModal";
import ResultModal from "../components/ResultModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;


export default function GameScreen() {
    const navigation = useNavigation<NavigationProp>();

    const {
        board,
        mode,
        status,
        handleCellPress,
        toggleMode,
        toggleStatus,
        resetGame,
    } = useGame({ size: 8, mines: 10 });


    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.title}>Minesweeper</Text>
            </View>

            <View style={styles.boardArea}>
                <BoardView board={board} status={status} onCellPress={handleCellPress}/>
            </View>

            <View style={styles.controls}>
                <Pressable
                    onPress={() => toggleMode("dig")}
                    style={[styles.modeBtn, mode === "dig" && styles.modeBtnActive]}>
                    <Text style={styles.modeText}>Dig</Text>
                </Pressable>

                <Pressable
                    onPress={() => toggleMode("flag")}
                    style={[styles.modeBtn, mode === "flag" && styles.modeBtnActive]}>
                    <Text style={styles.modeText}>Flag</Text>
                </Pressable>

                <Pressable
                    onPress={() => toggleStatus("idle")}
                    style={styles.pauseBtn}
                >
                    <Text style={styles.pauseText}>Pause</Text>
                </Pressable>
            </View>

            <PauseModal
                status={status}
                onContinue={() => toggleStatus("playing")}
                onReset={() => resetGame()}
                onHome={() => navigation.navigate("Home")}
            />

            <ResultModal status={status}
                         onHome={() => navigation.navigate("Home")}
                         onReset={() => resetGame()}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "center",
    },

    header: {
        alignItems: "center",
        paddingVertical: 8,
    },

    title: { fontSize: 26, fontWeight: "800" },

    boardArea: {
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 12,
    },

    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        paddingTop: 12,
        paddingBottom: 4,
    },

    modeBtn: {
        flex: 1,
        height: 44,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    modeBtnActive: {
        opacity: 0.75,
    },

    modeText: {
        fontWeight: "800",
        fontSize: 14,
    },

    pauseBtn: {
        height: 44,
        paddingHorizontal: 14,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    pauseText: {
        fontWeight: "900",
        fontSize: 14,
    },
});