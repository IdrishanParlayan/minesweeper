import { SafeAreaView } from 'react-native-safe-area-context';
import {Text, StyleSheet, View, Pressable} from "react-native";
import BoardView from "../components/BoardView";
import { useGame } from "../hooks/useGame";
import PauseModal from "../components/PauseModal";
import ResultModal from "../components/ResultModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";


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
                    <MaterialCommunityIcons name="pickaxe" size={24} />
                </Pressable>

                <Pressable
                    onPress={() => toggleMode("flag")}
                    style={[styles.modeBtn, mode === "flag" && styles.modeBtnActive]}>
                    <FontAwesome name="flag" size={24} color={"red"}/>
                </Pressable>

                <Pressable
                    onPress={() => toggleStatus("idle")}
                    style={styles.pauseBtn}
                >
                    <MaterialCommunityIcons name="pause" size={24} color={"white"}/>
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
        backgroundColor: colors.background,
        paddingHorizontal: spacing.md,
        justifyContent: "center",
    },

    header: {
        alignItems: "center",
        paddingVertical: spacing.sm,
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        color: colors.text,
    },

    boardArea: {
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: spacing.md,
    },

    controls: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginTop: spacing.md,
    },

    modeBtn: {
        flex: 1,
        height: 44,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
    },

    modeBtnActive: {
        backgroundColor: colors.primary,
    },

    pauseBtn: {
        height: 44,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
    },
});