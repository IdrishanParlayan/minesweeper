import { View, Text, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import type { GameStatus } from "../types/game";
import { FontAwesome } from "@expo/vector-icons";


type Props = {
    readonly status: GameStatus;
    readonly onHome: () => void;
    readonly onReset: () => void;
}

export default function ResultModal({ status, onHome, onReset }: Props) {
    const visible = status === "won" || status === "lost";
    if (!visible) return null;

    const title = status === "won" ? "You Won!" : "Game Over!";
    const subtitle = status === "won" ? "Nice Work!" : "You hit a mine.";

    return (
        <View  style={styles.overlay}>
            <BlurView intensity={25} style={StyleSheet.absoluteFillObject} />

            <View style={styles.modal}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>

                <Pressable style={styles.primaryBtn} onPress={onHome}>
                    <FontAwesome name="home" size={16} color="black" />
                </Pressable>

                <Pressable style={styles.secondaryBtn} onPress={onReset}>
                    <FontAwesome name="refresh" size={16} color="black" />
                </Pressable>
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
        backgroundColor: "rgba(0,0,0,0.15)",
    },
    modal: {
        width: 280,
        padding: 22,
        borderRadius: 18,
        backgroundColor: "white",
        alignItems: "center",
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "800",
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.8,
        marginBottom: 6,
    },
    primaryBtn: {
        width: "100%",
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },
    primaryText: {
        fontSize: 16,
        fontWeight: "800",
    },
    secondaryBtn: {
        width: "100%",
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        opacity: 0.9,
    },
    secondaryText: {
        fontSize: 16,
        fontWeight: "700",
    },
});