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
import { spacing, radius } from "../theme/theme";
import {useSettings} from "../context/SettingsContext";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;


export default function GameScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { colors } = useSettings();
    const styles = createStyles(colors);

    const {
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
    } = useGame({ size: 8, mines: 10 });


    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.title}>Minesweeper</Text>
            </View>

            <View style={styles.infoBar}>

                <View style={styles.infoBox}>
                    <FontAwesome name="flag" size={16} color={colors.text} />
                    <Text style={styles.infoText}>
                        {remainingFlags.toString().padStart(2, "0")}
                    </Text>
                </View>

                <View style={styles.infoBox}>
                    <FontAwesome name="clock-o" size={16} color={colors.text} />
                    <Text style={styles.infoText}>
                        {formatTime(time)}
                    </Text>
                </View>

                <Pressable style={styles.infoBox} onPress={handleHint}>
                    <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color={colors.text}/>
                    <Text style={styles.infoText}>x {hintCount}</Text>
                </Pressable>


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
                    <MaterialCommunityIcons name="pause" size={24} color={colors.text}/>
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

const createStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: spacing.md,
            justifyContent: "center",
        },

        header: {
            alignItems: "center",
            paddingVertical: spacing.sm,
            marginBottom: spacing.md,
        },

        title: {
            fontSize: 26,
            fontWeight: "800",
            color: colors.text,
        },

        infoBar: {
            flexDirection: "row",
            gap: spacing.sm,
            marginBottom: spacing.md,
        },

        infoBox: {
            flex: 1,
            height: 44, // Dig / Flag / Pause ile aynı
            borderRadius: radius.md,
            backgroundColor: colors.surface,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 6,
        },

        infoText: {
            fontSize: 16,
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