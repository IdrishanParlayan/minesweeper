import {View, Text, Pressable, StyleSheet, Switch} from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import {GameStatus} from "../types/game";
import { useSound } from "../context/SoundContext";
import { colors, spacing, radius } from "../theme/theme";

type Props = {
    readonly status: GameStatus;
    readonly onContinue: () => void;
    readonly onReset: () => void;
    readonly onHome: () => void;
};

export default function PauseModal({ status, onContinue, onReset, onHome }: Props) {
    if (status !== "idle") return null;

    const { soundStatus, setSoundStatus } = useSound();

    return (
        <View style={styles.overlay}>
            <BlurView intensity={60} style={StyleSheet.absoluteFillObject} />

            <View style={styles.modal}>
                <Text style={styles.title}>Game Paused</Text>

                <Pressable style={styles.button} onPress={onContinue}>
                    <FontAwesome name="play" size={16} color={colors.text} />
                    <Text style={styles.buttonText}>Resume</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={onReset}>
                    <FontAwesome name="refresh" size={16} color={colors.text} />
                    <Text style={styles.buttonText}>Restart</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={onHome}>
                    <FontAwesome name="home" size={16} color={colors.text} />
                    <Text style={styles.buttonText}>Home</Text>
                </Pressable>

                <View style={styles.settingRow}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name={soundStatus === "on" ? "volume-up" : "volume-off"} size={18} color="white"/>
                    </View>

                    <Text style={styles.settingLabel}>Sound</Text>

                    <Switch
                        value={soundStatus === "on"}
                        onValueChange={(value) => setSoundStatus(value ? "on" : "off")}
                        trackColor={{ false: "#334155", true: "#6366F1" }}
                        thumbColor={"#fff"}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        width: 280,
        padding: spacing.lg,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        alignItems: "center",
        gap: spacing.sm,

        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },

        elevation: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.text,
        marginBottom: spacing.sm,
    },

    button: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "white",
    },

    settingRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginTop: spacing.sm,
    },

    settingLabel: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },

    iconContainer: {
        width: 24,
        alignItems: "center",
    }
});