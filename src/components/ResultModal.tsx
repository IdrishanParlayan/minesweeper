import { View, Text, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import type { GameStatus } from "../types/game";
import { FontAwesome } from "@expo/vector-icons";
import { spacing, radius } from "../theme/theme";
import {useSettings} from "../context/SettingsContext";


type Props = {
    readonly status: GameStatus;
    readonly onHome: () => void;
    readonly onReset: () => void;
}

export default function ResultModal({ status, onHome, onReset }: Props) {
    const visible = status === "won" || status === "lost";
    if (!visible) return null;
    const { colors } = useSettings();
    const styles = createStyles(colors);

    const title = status === "won" ? "You Won!" : "Game Over!";
    const subtitle = status === "won" ? "Nice Work!" : "You hit a mine.";
    const iconName = status === "won" ? "trophy" : "bomb";

    return (
        <View style={styles.overlay}>
            <BlurView intensity={60} style={StyleSheet.absoluteFillObject} />

            <View style={styles.modal}>
                <FontAwesome
                    name={iconName}
                    size={40}
                    color={status === "won" ? "#FACC15" : "#EF4444"}
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>

                <Pressable style={styles.primaryBtn} onPress={onReset}>
                    <FontAwesome name="refresh" size={16} color={colors.text} />
                    <Text style={styles.primaryText}>Play Again</Text>
                </Pressable>

                <Pressable style={styles.primaryBtn} onPress={onHome}>
                    <FontAwesome name="home" size={16} color={colors.text} />
                    <Text style={styles.primaryText}>Home</Text>
                </Pressable>
            </View>
        </View>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.35)",
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
            fontSize: 24,
            fontWeight: "900",
            color: colors.text,
        },

        subtitle: {
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: spacing.sm,
        },

        primaryBtn: {
            width: "100%",
            height: 46,
            borderRadius: radius.md,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
        },

        primaryText: {
            fontSize: 16,
            fontWeight: "800",
            color: "white",
        },

        secondaryBtn: {
            width: "100%",
            height: 46,
            borderRadius: radius.md,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
        },

        secondaryText: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.text,
        },
    });