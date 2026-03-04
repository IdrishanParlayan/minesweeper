import { View, Text, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import {GameStatus} from "../types/game";


type Props = {
    readonly status: GameStatus;
    readonly onContinue: () => void;
    readonly onReset: () => void;
    readonly onHome: () => void;
};

export default function PauseModal({ status, onContinue, onReset, onHome }: Props) {
    if (status !== "idle") return null;

    return (
        <View style={styles.overlay}>
            <BlurView intensity={80} style={StyleSheet.absoluteFillObject} />

            <View style={styles.modal}>
                <Text style={styles.title}>Game Paused</Text>

                <Pressable style={styles.button} onPress={onContinue}>
                    <FontAwesome name="chevron-right" size={16} color="black" />
                </Pressable>

                <Pressable style={styles.button} onPress={onReset}>
                    <FontAwesome name="refresh" size={16} color="black" />
                </Pressable>

                <Pressable style={styles.button} onPress={onHome}>
                    <FontAwesome name="home" size={16} color="black" />
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
    },

    modal: {
        width: 260,
        padding: 24,
        borderRadius: 16,
        backgroundColor: "white",
        alignItems: "center",
        gap: 12,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
    },

    button: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: "center",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});